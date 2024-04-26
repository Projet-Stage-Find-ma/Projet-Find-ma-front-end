import { useState } from 'react';
import { useEffect } from 'react';
import './userMenu.css'
import axios from 'axios';
import {Link, Navigate, useNavigate } from 'react-router-dom'
import { logout } from '../UserConnection/connection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
export default function UserMenu()
{
    const [img,setImg] = useState('media/account.png')
    const [user,setUser] = useState('Nom Prenom')
    const navigate = useNavigate();

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
              
              
            } catch (error) {
                console.error('Error fetching user:', error);
                // navigate("/UserLogin");
            }
        };

        checkAuthentication();
    }, [navigate]);

    function Handlelogout()
    {
        localStorage.removeItem('token');
        navigate('/userLogin')
    }
    
    return <div className="menu">
       <FontAwesomeIcon icon={faUser} style={{"fontSize":"25px","marginRight":"15px"}}/>


        <p className='userName'>{user.nom} {user.prenom}</p>
        <div className='linksList' >
                <Link className='userProfileLinks' to="/UserProfile">Profile</Link>
                <Link className='userProfileLinks' to="/UserPhones">Mes Téléphone</Link>
                <Link className='userProfileLinks' to="/UserObjects">Mes Objets</Link>
                <button onClick={Handlelogout} className='userProfileButton'>Se déconnecter</button>
        </div>



    </div>
}