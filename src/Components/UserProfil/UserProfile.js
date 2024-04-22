import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './UserPhones.css';

import SideNavBar from '../layout/sideNav';
import './UserProfile.css';

export default function UserProfile() {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [editField, setEditField] = useState(null); 
    const [newValues, setNewValues] = useState({});
    const [message, setMessage] = useState("");
    const [nameClass, setNameClass] = useState("");

    useEffect(() => {
        const checkAuthentication = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate("/UserLogin");
                return;  
            }
            try {
                const response = await axios.get("http://localhost:3002/api/getuser", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
               setUser(response.data.row[0]);
               setNewValues(response.data.row[0]);
            } catch (error) {
                console.error('Error fetching user:', error);
                // navigate("/UserLogin");
            }
        };

        checkAuthentication();
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(newValues);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate("/UserLogin");
                return;
            }
    
            const response = await axios.post(`http://localhost:3002/api/updateUser`, newValues, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (response && response.data && response.data.message) {
                setMessage(response.data.message); 
                setNameClass("alert alert-success mb-3");
            } else {
                console.error('Invalid response:', response);
            }

            setEditField(null);
    
        } catch (error) {
            console.error('Error updating user:', error);
            if (error.response && error.response.data && error.response.data.message) {
                setMessage(error.response.data.message); 
                setNameClass("alert alert-danger mb-3");

            } else {
                setMessage('An unexpected error occurred.'); 
                setNameClass("alert alert-danger mb-3");
            }
        }
        
    };

    const handleInputClick = (field) => {
        setEditField(field);
    };

    return (
        <div className='userProfilContainer' style={{ display: "flex" }}>
            <SideNavBar />
            <div className='part2UserProfil'>
                <h1 className='userProfilTitle'>Profile</h1>
                {message && <p className={nameClass} style={{"textAlign":"center"}}>{message}</p>}
                <div className='userInformationProfil'>
                    <form onSubmit={handleSubmit}>
                        <label>Nom: </label>
                        {editField === 'nom' ? (
                            <input type="text" value={newValues.nom} onChange={(e) => setNewValues({ ...newValues, nom: e.target.value })} onBlur={() => setEditField(null)} />
                        ) : (
                            <span onClick={() => handleInputClick('nom')}>{newValues.nom}</span>
                        )}
                        <label>Prénom: </label>
                        {editField === 'prenom' ? (
                            <input type="text" value={newValues.prenom} onChange={(e) => setNewValues({ ...newValues, prenom: e.target.value })} onBlur={() => setEditField(null)} />
                        ) : (
                            <span onClick={() => handleInputClick('prenom')}>{newValues.prenom}</span>
                        )}
                        <label>Email: </label>
                        {editField === 'email' ? (
                            <input type="text" value={newValues.email} onChange={(e) => setNewValues({ ...newValues, email: e.target.value })} onBlur={() => setEditField(null)} />
                        ) : (
                            <span onClick={() => handleInputClick('email')}>{newValues.email}</span>
                        )}
                        
                      
                            <input type="submit" value="Enregistrer" />
                      
                       
                    </form>
                </div>
            </div>
        </div>
    );
}
