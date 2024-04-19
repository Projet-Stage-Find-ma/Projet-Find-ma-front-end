import React from "react";
import './UserSignUp.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

 export default function UserSignUp()
 {
    const [nom,setNom]=useState("");
    const [prenom,setPrenom]=useState("");
    const [email,setEmail]=useState("");
    const [pass,setPass]=useState("")
    const [confPass,setConfPass]=useState("");
    const [errors,setErrors]=useState({});
    const navigate=useNavigate();

    function validate(nom,prenom,email,pass,confPass)
    {
          const errors={};
          let valid=false;
          const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
          const regexNom=/^[a-zA-Z]+$/
          if(!nom)
          {
            errors.nom="* Merci de remplir ce chapms";
          }else if(!regexNom.test(nom)){
             errors.nom="* Nom invalid"
          }
          if(!prenom)
          {
            errors.prenom="* Merci de remplir ce chapms";
          }else if(!regexNom.test(prenom)){
            errors.nom="* Prénom invalid"
         }
         if(!email)
         {
            errors.email="* Merci de remplir ce chapms";
         }else if(!regex.test(email)){
            errors.email="* Email invalid"
         }

         if(!pass)
         {
            errors.pass="* Merci de remplir ce chapms";
         }
         if(!confPass)
         {
            errors.confPass="* Merci de confirmer votre mot de passe";
         }else if(pass!==confPass)
         {
            errors.confPass="* La confirmation du mot de passe est incorrecte. Veuillez vérifier et réessayer."
         }

         if(Object.keys(errors).length === 0)
         {
            valid=true;
         }

         return {errors,valid};
         
    }

   //SignUp API
   const addUser = async() =>{

      axios.post('http://localhost:3002/api/signup',{nom,prenom,email,pass})
      .then( res => 
      {
         console.log(res);
         navigate('/UserLogin');
      })
      .catch( err => console.log(err))
   }

   
   function handleSubmit(e)
    {
        e.preventDefault();
        const {errors,valid}=validate(nom,prenom,email,pass,confPass);
        setErrors(errors);
        if(valid)
        {
         addUser();
        }


    }
    return <>
    
    <div className="formSignup">
        <form action="" onSubmit={handleSubmit}>
            <h1>S'inscrire</h1>
        <div className="name-group">
        <input type="text" placeholder="Votre nom" onChange={(e)=>{setNom(e.target.value)}}/>
        <input type="text" placeholder="Votre prénom" style={{marginRight:"0px"}} onChange={(e)=>{setPrenom(e.target.value)}}/>
        </div>

        <div className="errorName">
        <p className="error" >{errors.nom}</p> 
        <p  className="error" style={{ "marginRight": "40px"}}>{errors.prenom}</p>
        </div>
        
        <input type="text" placeholder="Votre E-mail" onChange={(e)=>{setEmail(e.target.value)}}/>
        <p  className="error">{errors.email}</p>
        <input type="password" placeholder="Votre Mot de passe" onChange={(e)=>{setPass(e.target.value)}}/>
        <p  className="error">{errors.pass}</p>
        <input type="password" placeholder="confirmer votre Mot de passe" onChange={(e)=>{setConfPass(e.target.value)}}/>
        <p  className="error">{errors.confPass}</p>
        <button type="submit">S'inscrire</button>
        </form>
        <a href="">Vous avez déjà un compte? Connectez-vous!</a>
    </div>
    </>

 }