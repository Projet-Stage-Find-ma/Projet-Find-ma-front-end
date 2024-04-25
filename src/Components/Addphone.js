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
    const [selectedOption, setSelectedOption] = useState(null);
  const [options,setOptions] = useState([]);
  useEffect(() =>
{
  axios.get("http://localhost:3002/api/data/parametres/phones")
  .then(res => 
  {
    setOptions(res.data)
    
  })
  .catch(error => console.error(error));
},[])


    async function handleSubmit(e) {
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
    const handleChange2 = (selectedOption) => {

        setSelectedOption(selectedOption);
        
        if (selectedOption) {
          const selectedValue = selectedOption.label;
          const selectedGroup = options.find(group => group.options.some(opt => opt.value === selectedOption.value));
          const groupLabel = selectedGroup ? selectedGroup.label : '';
         
          setValues({...values,"marque":groupLabel,"model":selectedValue})
          console.log("values", values)
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
                        
                        <div className="label-input-container">
                            <label htmlFor="couleur">Couleur:</label>
                            <input type="text" id="couleur" name="couleur" onChange={handleChange}/>
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
