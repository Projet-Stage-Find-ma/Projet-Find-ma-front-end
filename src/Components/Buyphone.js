import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Buyphone.css"
import { getUserID } from './UserConnection/connection';

export default function Buyphone() {
    const [code, setCode] = useState('');
    const navigate = useNavigate();
    const [msg,setMessage]=useState("");
    const [nameClass,setNameClass]=useState("")
    
    useEffect(() =>
    {
     if(!getUserID())
        navigate('/UserLogin')
    })
    async function handleSubmit(e) {
        e.preventDefault();
        if (!code) {
            alert("Please enter a code before submitting.");
            return;
        }

        try {
          
            const response = await axios.post("http://localhost:3002/api/buyphone", {code:code}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.status === 200) {
                setMessage(response.data.message);
                setNameClass("alert alert-success mb-3")
                
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
               setMessage('Invalid code. Please check your code and try again.');
               setNameClass("alert alert-danger mb-3")
            } else if (error.response && error.response.status === 401) {
                setMessage('You are not authorized. Please login again.');
                setNameClass("alert alert-danger mb-3")
                navigate("/UserLogin");
            } else {
                console.error('Error purchasing phone:', error);
                setMessage('An error occurred. Please try again later.');
                setNameClass("alert alert-danger mb-3")
            }
        }
    }

    return <>
       {msg && <p className={nameClass} style={{"textAlign":"center","marginTop":"20px"}}>{msg}</p>}
        <div className='globalContainerAchat'>
        <div className='myphoneAchat'>
            <form onSubmit={handleSubmit}>
                <label>Code d'achat: </label>
                <input type="text" value={code} onChange={(e) => setCode(e.target.value)} />
               <button type='submit'>Acheter</button>
            </form>
        </div>
        </div>
        </>
    ;
}
