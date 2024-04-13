
import React, { useState } from "react";
import "./UserLogin.css";
import { useNavigate } from "react-router-dom";

export default function UserLogin() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const [msg,setMessage]=useState("")
    const navigate = useNavigate(); 

    const users = [{"email": "email1@gmail.com", "pass": 123456}, {"email": "email2@gmail.com", "pass": 123}];

    const validate = (email, pass) => {
        const errors = {};
        let exist = false; 
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
       
        if (!email) {
            errors.email = "Email is required!";
        } else if (!regex.test(email)) {
            errors.email = "This is not a valid email format!";
        }
        if (!pass) {
            errors.password = "Password is required";
        }

        if (Object.keys(errors).length === 0) {
            if (users.find((u) => u.email === email && u.pass === parseInt(pass))) { 
                exist = true;
            }
        }
        return { errors, exist };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { errors, exist } = validate(email, pass);
        setFormErrors(errors);
        
        if (exist) {
            navigate("/home"); 
        }
        else if(Object.keys(errors).length === 0)
        {
            setMessage("Cet utilisateur ne se trouve pas");
        }
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
