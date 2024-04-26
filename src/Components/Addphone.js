import React, { useState } from "react";
import "./Addphone.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Select from 'react-select';

export default function Addphone() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        IMEI1: "",
        IMEI2: "",
        serialNumber: "",
        marque: "",
        model: "",
        couleur: "",
        tel1: "",
        tel2: "",
        email: "",
        statut: ""
    });
    const [msg,setMessage]=useState("")
    const [nameClass,setNameClass]=useState("")
    const [selectedOption, setSelectedOption] = useState(null);
    const [options,setOptions] = useState([]);

    const [selectedOption2, setSelectedOption2] = useState(null);
  const [options2,setOptions2] = useState([]);

  //authentification
    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate("/UserLogin");
                }
            } catch (error) {
                console.error('Error checking authentication:', error);
                navigate("/UserLogin");
            }
        };

        checkAuthentication();
    }, [navigate]);
    
    //la marque et modéles de téléphones
  useEffect(() => {
    axios.get("http://localhost:3002/api/data/parametres/phones")
      .then(res => {
       
        const fetchedOptions = res.data;
  
       
        const otherOption = fetchedOptions.find(option => option.label === "Autre");
        const filteredOptions = fetchedOptions.filter(option => option.label !== "Autre");
  
      
        if (otherOption) {
          filteredOptions.push(otherOption);
        }
  
        
        setOptions(filteredOptions);
       
      })
      .catch(error => console.error(error));
  }, []);


  //le couleur de téléphone
  useEffect(() => {
    axios.get("http://localhost:3002/api/data/parametres/colors")
      .then(res => {
       
        const fetchedOptions = res.data;
  
       
        const otherOption = fetchedOptions.find(option => option.label === "Autre");
        const filteredOptions = fetchedOptions.filter(option => option.label !== "Autre");
  
      
        if (otherOption) {
          filteredOptions.push(otherOption);
        }
  
        
        setOptions2(filteredOptions);
       
      })
      .catch(error => console.error(error));
  }, []);
  

    async function handleSubmit(e) {
        console.log(values)
        e.preventDefault();
       
        try {
            const token = localStorage.getItem('token');
            
            if (!token) {
                console.error('Token not found.');
                return;
            }
            const response = await axios.post("http://localhost:3002/api/addphone", values, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            });
           setMessage(response.data.message);
           setNameClass("alert alert-success mb-3")
        } catch (error) {
            console.error('Error occurred while submitting form:', error);
            setMessage('un erreur est servenu.');
            setNameClass("alert alert-danger mb-3")

    }
    }
    function handleChange(e) {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    function handleReset() {
        setValues({
            IMEI1: "",
            IMEI2: "",
            serialNumber: "",
            marque: "",
            model: "",
            couleur: "",
            tel1: "",
            tel2: "",
            email: "",
            statut: ""
        });
    }

    //changement de marque
    const handleChange2 = (selectedOption) => {

        setSelectedOption(selectedOption);
        
        if (selectedOption) {
          const selectedValue = selectedOption.label;
          const selectedGroup = options.find(group => group.options.some(opt => opt.value === selectedOption.value));
          const groupLabel = selectedGroup ? selectedGroup.label : '';
         if(groupLabel!=="Autre")
          setValues({...values,"marque":groupLabel,"model":selectedValue})

          
        }
      };
//changement de couleur
const handleChange3 = (selectedOption) => {

    setSelectedOption2(selectedOption);
    
    if (selectedOption) {
      const selectedValue = selectedOption.label;
      
     if(selectedOption.value!=="Autre")
      setValues({...values,"couleur":selectedValue})
     
     
    }
  };

    return (
        <div className="globalContainerPhone">
          {msg && <p className={nameClass} style={{"textAlign":"center"}}>{msg}</p>}
            <h1>Ajouter Mon IMEI</h1>
            <form action="" onSubmit={handleSubmit}>
                <div className="formContainerPhone">
                    <div className="part1Phone">
                        <div className="label-input-container">
                            <label htmlFor="IMEI1">IMEI 1:</label>
                            <input type="text" id="IMEI1" name="IMEI1" onChange={handleChange}/>
                        </div>
                        <div className="label-input-container">
                            <label htmlFor="IMEI2">IMEI 2 (Optionnel):</label>
                            <input type="text" id="IMEI2" name="IMEI2" onChange={handleChange}/>
                        </div>
                        <div className="label-input-container">
                            <label htmlFor="ns">Numéro de série:</label>
                            <input type="text" id="ns" name="serialNumber" onChange={handleChange}/>
                        </div>
                        <div className="label-input-container">
                            <label htmlFor="marque">Marque / Modéle :</label>
                            <div style={{ width: '100%' }} id="mySelectPhones">
                            <Select
                            value={selectedOption}
                            onChange={handleChange2}
                            options={options}
                            placeholder="Choisissez la marque et le modéle de téléphone"
                            styles={{
                                control: (provided) => ({
                                ...provided,
                                backgroundColor: '#97CCE8', 
                                color: 'black', 
                                
                                }),
                                indicatorSeparator: () => ({
                                display: 'none', 
                                }),
                                dropdownIndicator: (provided) => ({
                                ...provided,
                                color: 'black', 
                                }),
                                placeholder: (provided) => ({
                                ...provided,
                                color: 'black',
                                }),
                                groupHeading: (provided) => ({
                                    ...provided,
                                    fontWeight: 'bold', 
                                    fontSize: '20px',
                                    color:"#97CCE8"
                                  }),
                            }}
                            />

                            </div>
                            
                                                
                        </div>
                        <div className="label-input-container2">
                        {( selectedOption  && selectedOption.label==="Autre" ) && <><label htmlFor="">Entrer la marque</label><input type="text" name="marque" placeholder="votre marque" onChange={handleChange}/><input type="text" name="model" placeholder="votre model" onChange={handleChange}/></>}
                        </div>

                        {/* couleur */}
                        <div className="label-input-container">
                            <label htmlFor="marque">Couleur :</label>
                            <div style={{ width: '100%' }} id="mySelectPhones">
                            <Select
                            value={selectedOption2}
                            onChange={handleChange3}
                            options={options2}
                            placeholder="Choisissez la couleur de téléphone"
                            styles={{
                                control: (provided) => ({
                                ...provided,
                                backgroundColor: '#97CCE8', 
                                color: 'black', 
                                
                                }),
                                indicatorSeparator: () => ({
                                display: 'none', 
                                }),
                                dropdownIndicator: (provided) => ({
                                ...provided,
                                color: 'black', 
                                }),
                                placeholder: (provided) => ({
                                ...provided,
                                color: 'black',
                                }),
                                groupHeading: (provided) => ({
                                    ...provided,
                                    fontWeight: 'bold', 
                                    fontSize: '20px',
                                    color:"#97CCE8"
                                  }),
                            }}
                            />

                            </div>
                            
                                                
                        </div>
                        <div className="label-input-container3">
                        {( selectedOption2  && selectedOption2.label==="Autre" ) && <><label htmlFor="">Entrer une couleur</label><input type="text" name="couleur" placeholder="votre couleur" onChange={handleChange}/></>}
                        </div>
                    </div>
                    <div className="part2Phone">
                        <p>Entrez un numéro pour vous contacter au cas où vous perdiez votre téléphone</p>
                        <div className="label-input-container">
                            <label htmlFor="tel1">Tel 1:</label>
                            <input type="text" id="tel1" name="tel1" onChange={handleChange}/>
                        </div>
                        <div className="label-input-container">
                            <label htmlFor="tel2">Tel 2:</label>
                            <input type="text" id="tel2" name="tel2" onChange={handleChange}/>
                        </div>
                        <div className="label-input-container">
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" onChange={handleChange}/>
                        </div>
                        <div className="label-input-container">
                            <label htmlFor="statut">Statut:</label>
                            <select id="statut" name="statut" onChange={handleChange}>
                                <option value="">Choisissez l'état de votre appareil</option>
                                <option value="vole">Volé</option>
                                <option value="perdu">Perdu</option>
                                <option value="possede">Possédé</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="myButtonsPhone">
                <input type="submit" value="Confirmer" />
                <input type="reset" value="Annuler" onClick={handleReset}/>
                </div>
            </form>
        </div>
    );
}
