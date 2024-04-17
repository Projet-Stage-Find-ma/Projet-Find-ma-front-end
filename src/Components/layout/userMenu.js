import { useState } from 'react';
import './userMenu.css'
import {Link, Navigate, useNavigate } from 'react-router-dom'
import { logout } from '../UserConnection/connection';
export default function UserMenu()
{
    const [img,setImg] = useState('media/account.png')
    const [userName,setUserName] = useState('Nom Prenom')
    const navigate = useNavigate();

    function Handlelogout()
    {
        localStorage.removeItem('token');
        navigate('/userLogin')
    }
    
    return <div className="menu">
        <img src={img} width='60px' alt="" />


        <p className='userName'>{userName}</p>
        <div className='linksList' >
                <Link className='userProfileLinks' to="/UserProfile">Profile</Link>
                <Link className='userProfileLinks' to="/UserPhones">Mes IMEI</Link>
                <Link className='userProfileLinks' to="/UserObjects">Mes Objets</Link>
                <button onClick={Handlelogout}>Se déconnecter</button>
        </div>



    </div>
}