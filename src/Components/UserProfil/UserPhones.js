import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './UserPhones.css';
import { Link } from 'react-router-dom';
import SideNavBar from '../layout/sideNav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

export default function UserPhones() {
    const [telephones, setTelephones] = useState([]);
    const[msg,setMessage]=useState("");
    const[nameClass,setNameClass]=useState("")
    const navigate = useNavigate();
    const [code,setCode]=useState({});

    useEffect(() => {
        const checkAuthentication = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate("/UserLogin");
                return;  
            }
            try {
                const response = await axios.get("http://localhost:3002/api/getphones", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setTelephones(response.data.row || []); 
                console.log(response.data.row);
            } catch (error) {
                console.error('Error fetching phones:', error);
                navigate("/UserLogin");
            }
        };

        checkAuthentication();
    }, [navigate]);

    async function deletePhone(phoneId) {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate("/UserLogin");
                return;
            }

            const response = await axios.delete(`http://localhost:3002/api/deletePhone/${phoneId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response && response.data && response.data.message) {
                setMessage(response.data.message); 
                setNameClass("alert alert-success mb-3")
                setTelephones(prevTelephones => prevTelephones.filter(phone => phone.id !== phoneId));
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
            }}
    }

    async function sell(phoneID,ownerID) { 
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate("/UserLogin");
                return;
            }
    
            const response = await axios.post(`http://localhost:3002/api/generateCode`, {phoneID,ownerID}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setCode({...code,token:response.data.code,phoneID});
            console.log(response.data.code)
            
        } catch (error) {
            console.error('Error generating code for selling phone:', error);
        }
    }
    
    return <>
   
        <div className='userPhone'>
        <SideNavBar/>
        <div className='PhonesContainer'>
            {msg && <p className={nameClass} style={{"textAlign":"center"}}>{msg}</p>}
            <h1 className='titlePhone'>Mes Téléphones: </h1>
            <table  className='Tablephones'>
                <thead>
                    <tr>
                        <th>IMEI</th>
                        <th>Serial Number</th>
                        <th>Les caractéristiques</th>
                        <th>Statut</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {telephones.map((t, index) => (
                        <tr key={index}>
                            <td>IMEI1: {t.imei1} <br />{t.imei2 ?`IMEI2: ${t.imei2}` : ""}</td>
                            <td>{t.serialNumber}</td>
                            <td>Marque: {t.brand} <br />Model: {t.model} <br />Couleur: {t.color}  </td>
                            
                            <td>{t.status==="perdu" || t.status==="vole" ? <span style={{"color":"red","fontWeight":"bold","fontSize":"20px"}}> <FontAwesomeIcon icon={faTriangleExclamation} /> {t.status}</span> : <span style={{"color":"green","fontSize":"20px","fontWeight":"bold"}}>{t.status}</span>}</td>
                            <td className='userPhoneButtons'>
                                
                            <Link to={`/Modifyphone/${t.id}`}>  <button id="modifierPhone" > Modifier </button></Link>
                                <button id="supprimerPhone" onClick={() => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce téléphone ?")) {
            deletePhone(t.id);
        }
    }}>Supprimer</button>
                                <button id="vendrePhone" onClick={()=>{sell(t.id,t.owner)}}>Vendre</button>
                                {(code!=null && t.id === code.phoneID) && <input type="text" value={code.token} disabled/>}
                               
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    
    </>
    
}
