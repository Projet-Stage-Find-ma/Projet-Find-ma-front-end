import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ModifyPhone() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [phone, setPhone] = useState({});
    const [newValues,setNewValues]=useState({}); 
    const [msg,setMessage]=useState("");
    const [nameClass,setNameClass]=useState("")

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

    function handleChange(e)
    {
        setNewValues({...newValues,[e.target.name]:e.target.value})
    }


    async function handleSubmit(e) {
        e.preventDefault();
    
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
                        <label htmlFor="marque">Marque:</label>
                        <input type="text" id="marque" name="brand" onChange={handleChange} value={newValues.brand || ""}/>
                    </div>
                    <div className="label-input-container">
                        <label htmlFor="model">Modèle:</label>
                        <input type="text" id="model" name="model" onChange={handleChange} value={newValues.model || ""}/>
                    </div>
                    <div className="label-input-container">
                        <label htmlFor="couleur">Couleur:</label>
                        <input type="text" id="couleur" name="color" onChange={handleChange} value={newValues.color || ""}/>
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
