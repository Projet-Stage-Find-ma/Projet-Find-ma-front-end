import { useState } from 'react';
import './userMenu.css'
import {Link } from 'react-router-dom'

export default function UserMenu()
{
    const [img,setImg] = useState('media/account.png')
    const [userName,setUserName] = useState('Nom Prenom')

 
    
    return <div className="menu">
        <img src={img} width='60px' alt="" />


        <p className='userName'>{userName}</p>
        <div className='linksList' >
                <Link className='userProfileLinks' to="/UserProfile">Profile</Link>
                <Link className='userProfileLinks' to="/UserPhones">Mes IMEI</Link>
                <Link className='userProfileLinks' to="/UserObjects">Mes Objets</Link>
        </div>



    </div>
}