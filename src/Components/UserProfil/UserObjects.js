import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './UserPhones.css';
import { Link } from 'react-router-dom';
import SideNavBar from '../layout/sideNav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

export default function UserPbejcts() {
  
    const navigate = useNavigate();
    const [objects,setObjects] = useState([]);
    const[msg,setMessage]=useState("");
    const[nameClass,setNameClass]=useState("")

    useEffect(() => {
        const checkAuthentication = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate("/UserLogin");
                return;  
            }
            try {
                const response = await axios.get("http://localhost:3002/api/data/userObjects", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setObjects(response.data.row || []); 
                console.log(response.data.row);
            } catch (error) {
                console.error('Error fetching phones:', error);
                // navigate("/UserLogin");
            }
        };

        checkAuthentication();
    }, [navigate]);

     async function deleteObject(objectId)
    {
        try {
           
            const token = localStorage.getItem('token');
            if (!token) {
                navigate("/UserLogin");
                return;
            }

            const response = await axios.delete(`http://localhost:3002/api/deleteObject/${objectId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response && response.data && response.data.message) {
                setMessage(response.data.message); 
                setNameClass("alert alert-success mb-3")
                setObjects(prevObjects => prevObjects.filter(o => o.id !== objectId));
            } else {
                console.error('Invalid response:', response);
            }
    
        } catch (error) {
            console.error('Error deleting object:', error);
            if (error.response && error.response.data && error.response.data.message) {
                setMessage(error.response.data.message); 
                setNameClass("alert alert-danger mb-3")

            } else {
                setMessage('An unexpected error occurred.'); 
                setNameClass("alert alert-danger mb-3")
            }}
    }
   
    return  <div className='userPhone'>
        <SideNavBar/>
        <div className='PhonesContainer'>
            {msg && <p className={nameClass} style={{"textAlign":"center"}}>{msg}</p>}
            <h1 className='titlePhone'>Mes objects perdue: </h1>
            <table  className='Tablephones'>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Details</th>
                        <th>Détails spécifiques</th>
                        <th>Categorie</th>
                        <th>Sous-Categorie</th>
                        <th>Ville</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {objects.map((t, index) => (
                        <tr key={index}>
                            <td><img src={`http://localhost:3002/${t.image}`} style={{maxWidth:"200px",maxHeight:"150px"}} alt="" /></td>
                            <td>Endroit: {t.details.Endroit}
                            <br />Description:{t.details.Description }
                            <br />Designation:{t.details.Designation }</td>
                            <td>{(t.category === 'Animal' && t.subCategory === 'Autre')? (<div><p>Nom:{t.details.animalName}</p>  <p>Race:{t.details.animalName}</p> <p>Couleur:{t.details.animalColor}</p></div>)
                            :((t.subCategory === 'Telephone') &&(<div><p>IMEI:{t.details.imei}</p>  <p>Numéro de série:{t.details.serialNumber}</p> <p>Couleur:{t.details.phoneColor}</p></div>)) }</td>

                            <td>{t.category}   </td>
                            
                            <td>{t.subCategory}</td>

                            <td>{t.city}</td>
                            <td className='userPhoneButtons'>
                                
                            <Link to={`/ModifyObject/${t.id}`}>  <button id="modifierPhone" > Modifier </button></Link>
                                <button id="supprimerPhone" onClick={() => {
                            if (window.confirm("Êtes-vous sûr de vouloir supprimer cette Objet?")) {
                                deleteObject(t.id);
                            }
                            }}>Supprimer</button>
                               
                               
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        </div>
        
    
   
    
}
