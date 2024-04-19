
import React, { useState } from "react";
import "./UserLogin.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function UserLogin() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const [msg, setMessage] = useState("");
    const navigate = useNavigate(); 

    const validate = (email, pass) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
       
        if (!email) {
            errors.email = "Email is required!";
        } else if (!regex.test(email)) {
            errors.email = "This is not a valid email format!";
        }
        if (!pass) {
            errors.password = "Password is required";
        }

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validate(email, pass);
        setFormErrors(errors);
        
        if (Object.keys(errors).length === 0) {
            try {
                const response = await axios.post('http://localhost:3002/api/login', { email, pass });
                
                const token = response.data.token;
                localStorage.setItem('token', token);
                navigate("/home"); 
            } catch (error) {
                if (error.response) {
                    
                    console.error("Server responded with an error:", error.response.data);
                } else if (error.request) {
                    console.error("No response received from server:", error.request);
                } else {
                    console.error("Error setting up the request:", error.message);
                }
                setMessage("An error occurred during login. Please try again.");
            }
        }

    };

    return (
        <>
     
            <div className="LoginUserForm">
                <p className="error">{msg}</p>
                <h1>Se connecter</h1>
                <form action="" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Entrer votre E-mail" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    <p className="error">{formErrors.email && formErrors.email}</p>
                    <input type="password" placeholder="Entrer votre Mot de passe" value={pass} onChange={(e) => { setPass(e.target.value) }} />
                    <p className="error">{formErrors.password && formErrors.password}</p>
                    <a href="">Mot de passe oublié?</a>
                    <button type="submit">Se connecter</button>
                </form>
                <a href="" className="lien2">Nouveau sur Find.ma? Rejoignez-nous! </a>
            </div>
          
        </>
    );
}
