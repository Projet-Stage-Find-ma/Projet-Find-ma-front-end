
import React, { useState } from "react";
import "./UserLogin.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserLogin(props) {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const [msg,setMessage]=useState("")
    const navigate = useNavigate(); 

    const [userIsLoggedIn,setUserIsLoggedIn] = useState(false);
  

    // const validate = (email, pass) => {
    //     const errors = {};
    //     let exist = false; 
    //     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
       
    //     if (!email) {
    //         errors.email = "Email is required!";
    //     } else if (!regex.test(email)) {
    //         errors.email = "This is not a valid email format!";
    //     }
    //     if (!pass) {
    //         errors.password = "Password is required";
    //     }

    //     return { errors, exist };
    // };

    const handleLogin = async() =>
    {
        await axios.post('http://localhost:3002/user/login',{email,pass})
        .then(res =>
        {
            //extracting the toking
            const {token} = res.data;

            //saving the token in local storage
            localStorage.setItem('token',token)
    
        })
        .then(() => navigate(`/`))
        .catch( err => console.log(err))
    }

   
    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin();
    
    };

    return (
        <>
          

            <div className="LoginUserForm">
                <p className="error">{msg}</p>
                <h1>Se connecter</h1>
                <form action="" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Entrer votre E-mail" onChange={(e) => { setEmail(e.target.value) }} />
                    <p className="error">{formErrors.email && formErrors.email}</p>
                    <input type="password" placeholder="Entrer votre Mot de passe" onChange={(e) => { setPass(e.target.value) }} />
                    <p className="error">{formErrors.password && formErrors.password}</p>
                    <a href="">Mot de passe oublié?</a>
                    <button type="submit">Se connecter</button>
                </form>
                <a href="" className="lien2">Nouveau sur Find.ma? Rejoignez-nous! </a>
            </div>
        </>
    );
}
