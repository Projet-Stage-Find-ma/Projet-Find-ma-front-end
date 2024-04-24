import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { getUserID } from './UserConnection/connection';


export default function VerifyIMEI()
{
    const[imei,setImei]=useState(null)
    const [exist,setExist]=useState(false)
    const [msg,setMsg]=useState("")
    const navigate=useNavigate()
    useEffect(() =>
    {
     if(!getUserID())
        navigate('/UserLogin')
    })



    async function handleSubmit(e) {
        e.preventDefault();
        if (!imei) {
            alert("Please enter a code before submitting.");
            return;
        }

        try {
          
            const response = await axios.post("http://localhost:3002/api/verifyIMEI", {imei}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
           
           
            if(response.data.message){
                setMsg(response.data.message)
              
            }else
            {
                setExist(true)
            }

           
        } catch (error) {
           console.log(error)
        }
    }


    return <>
   
    <div className='globalContainerAchat'>
    <div className='myphoneAchat'>
    {msg && <p className="alert alert-danger mb-3">{msg}</p>}
    <form action="" onSubmit={handleSubmit}>
        <label htmlFor="">IMEI:</label>
         <input type="text" onChange={(e)=>{setImei(e.target.value)}}/>
        <button type="submit">Vérifier</button>

        {exist && <div><Link to="/Buyphone" style={{"fontSize":"18px","float":"right"}}><FontAwesomeIcon icon={faArrowRight} style={{"marginLeft":"10px","marginTop":"4px","float":"right"}}/>suivant</Link></div>}
    </form>
    </div>
    </div>
    </>
}