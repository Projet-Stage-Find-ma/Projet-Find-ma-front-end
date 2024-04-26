import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Select from 'react-select';

export default function ModifyPhone() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [phone, setPhone] = useState({});
    const [newValues,setNewValues]=useState({}); 
    const [msg,setMessage]=useState("");
    const [nameClass,setNameClass]=useState("")
    const [selectedOption, setSelectedOption] = useState(null);
  const [options,setOptions] = useState([]);
  const [options2,setOptions2] = useState([]);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [autreMarque,setAutreMarque]=useState(true);
  const [autreColor,setAutreColor]=useState(true)

    useEffect(() => {
        const checkAuthentication = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate("/UserLogin");
                return;
            }
            try {
                const response = await axios.get(`http://localhost:3002/api/getSinglephone/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setPhone(response.data.phone || {});
                setNewValues(response.data.phone)


                
               
            } catch (error) {
                console.error('Error fetching phone:', error);
                navigate("/UserLogin");
            }
        };

        checkAuthentication();
    }, [id, navigate]);


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
            if (phone && phone.model) {
               
                const selectedModelOption = options.map((opt)=>{return opt.options});
                for (let x of selectedModelOption) {
                    for (let opt of x) {
                       if(opt.value==phone.model)
                       {
                        setSelectedOption(opt);
                        setAutreMarque(false)
                       
                       }
                      
                    }
                }
              
                if(autreMarque===true)
                {
                    setSelectedOption({"label":"Autre","value":"Autre"})
                    
                }
                
               
            }
            
            
            
            
            
          })
          .catch(error => console.error(error));
      }, [phone,autreMarque]); 

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
        for(let x of options2)
        {
           
           if(x.value==phone.color)
           {
           
            setSelectedOption2({"label":phone.color,"value":phone.color})
            setAutreColor(false)
            
           }
        }
        if(autreColor===true)
        {
            setSelectedOption2({"label":"Autre","value":"Autre"})
        }
        
        
       
       
      })
      .catch(error => console.error(error));
  }, [phone,autreColor]);

    function handleChange(e)
    {
        setNewValues({...newValues,[e.target.name]:e.target.value})
    }


    async function handleSubmit(e) {
        e.preventDefault();
        console.log(newValues)
    
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate("/UserLogin");
                return;
            }
    
            const response = await axios.post(`http://localhost:3002/api/updatePhone/${id}`, newValues, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (response && response.data && response.data.message) {
                setMessage(response.data.message); 
                setNameClass("alert alert-success mb-3")
            } else {
                console.error('Invalid response:', response);
            }
    
        } catch (error) {
            console.error('Error updating phone:', error);
            if (error.response && error.response.data && error.response.data.message) {
                setMessage(error.response.data.message); 
                setNameClass("alert alert-danger mb-3")

            } else {
                setMessage('An unexpected error occurred.'); 
                setNameClass("alert alert-danger mb-3")
            }
        }
    }

    function handleReset(){
        setNewValues(phone)
    }

    const handleChange2 = (selectedOption) => {
        
        setSelectedOption(selectedOption);
        
        if (selectedOption) {
          const selectedValue = selectedOption.label;
          const selectedGroup = options.find(group => group.options.some(opt => opt.value === selectedOption.value));
          const groupLabel = selectedGroup ? selectedGroup.label : '';
         if(groupLabel!=="Autre")
          setNewValues({...newValues,"brand":groupLabel,"model":selectedValue})

          
        }
      };
      //changement de couleur
const handleChange3 = (selectedOption) => {

    setSelectedOption2(selectedOption);
    
    if (selectedOption) {
      const selectedValue = selectedOption.label;
      
     if(selectedOption.value!=="Autre")
      setNewValues({...newValues,"color":selectedValue})
     
     
    }
  };

    
    return (
        
        <div className="globalContainerPhone">
           {msg && <p className={nameClass} style={{"textAlign":"center"}}>{msg}</p>} 
       <h1>Les informations de téléphone</h1>
        <form action="" onSubmit={handleSubmit}>
            <div className="formContainerPhone">
                <div className="part1Phone">
                    <div className="label-input-container">
                        <label htmlFor="IMEI1">IMEI 1:</label>
                        <input type="text" id="IMEI1" name="imei1" onChange={handleChange} value={newValues.imei1 || ""}/>
                    </div>
                    <div className="label-input-container">
                        <label htmlFor="IMEI2">IMEI 2 (Optionnel):</label>
                        <input type="text" id="IMEI2" name="imei2" onChange={handleChange} value={newValues.imei2 || ""}/>
                    </div>
                    <div className="label-input-container">
                        <label htmlFor="ns">Numéro de série:</label>
                        <input type="text" id="ns" name="serialNumber" onChange={handleChange} value={newValues.serialNumber || ""}/>
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
                        {( selectedOption  && selectedOption.label==="Autre" ) && <><label htmlFor="">Entrer la marque</label><input type="text" name="brand" placeholder="votre marque" onChange={handleChange} value={newValues.brand || ""}/><input type="text" name="model" placeholder="votre model" onChange={handleChange} value={newValues.model || ""}/></>}
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
                        {( selectedOption2  && selectedOption2.label==="Autre" ) && <><label htmlFor="">Entrer une couleur</label><input type="text" name="color" placeholder="votre couleur" onChange={handleChange} value={newValues.color || " "}/></>}
                        </div>
                </div>
                <div className="part2Phone">
                    <div className="label-input-container">
                        <label htmlFor="tel1">Tel 1:</label>
                        <input type="text" id="tel1" name="tel1" onChange={handleChange} value={newValues.tel1 || ""}/>
                    </div>
                    <div className="label-input-container">
                        <label htmlFor="tel2">Tel 2:</label>
                        <input type="text" id="tel2" name="tel2" onChange={handleChange} value={newValues.tel2 || ""}/>
                    </div>
                    <div className="label-input-container">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" onChange={handleChange} value={newValues.email || ""}/>
                    </div>
                    <div className="label-input-container">
                        <label htmlFor="statut">Statut:</label>
                        <select id="statut" name="status" onChange={handleChange}>
                            <option value="">Choisissez l'état de votre appareil</option>
                            <option value="vole" selected={newValues.status === "vole"}>Volé</option>
                            <option value="perdu"  selected={newValues.status === "perdu"}>Perdu</option>
                            <option value="possede"  selected={newValues.status === "possede"}>Possédé</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="myButtonsPhone">
            <input type="submit" value="Enregistrer" />
            <input type="reset" value="Annuler" onClick={handleReset}/>
            </div>
        </form>
    </div>
    );
}
