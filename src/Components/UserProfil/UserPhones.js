import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './UserPhones.css';
import { Link } from 'react-router-dom';
import SideNavBar from '../layout/sideNav';

export default function UserPhones() {
    const [telephones, setTelephones] = useState([]);
    const[msg,setMessage]=useState("");
    const[nameClass,setNameClass]=useState("")
    const navigate = useNavigate();
    const [code,setCode]=useState(null);

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
                setTelephones(response.data.phones || []); 
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

            const response = await axios.delete(`http://localhost:3000/api/deletePhone/${phoneId}`, {
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

    async function sell(id) { 
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate("/UserLogin");
                return;
            }
    
            const response = await axios.post(`http://localhost:3000/api/generateCode`, { id }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setCode(response.data.code);
            
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
                        <th>IMEI1</th>
                        <th>IMEI2</th>
                        <th>Serial Number</th>
                        <th>Marque</th>
                        <th>Model</th>
                        <th>Couleur</th>
                        <th>Statut</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {telephones.map((t, index) => (
                        <tr key={index}>
                            <td>{t.imei1}</td>
                            <td>{t.imei2 ? t.imei2 : "-"}</td>
                            <td>{t.serialNumber}</td>
                            <td>{t.brand}</td>
                            <td>{t.model}</td>
                            <td>{t.color}</td>
                            <td>{t.status}</td>
                            <td className='userPhoneButtons'>
                                
                            <button id="modifierPhone" > <Link to={`/Modifyphone/${t.id}`} style={{"color":"white"}}>Afficher</Link></button>
                                <button id="supprimerPhone" onClick={() => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce téléphone ?")) {
            deletePhone(t.id);
        }
    }}>Supprimer</button>
                                <button id="vendrePhone" onClick={()=>{sell(t.id)}}>Vendre</button>
                                {code!=null && <input type="text" value={code} disabled/>}
                               
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    
    </>
    
}
