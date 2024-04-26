
import axios from "axios";
import { useState } from "react";

export default function ContactForm(props)
{

    const ownerEmail = props.contactEmail;
    const [email,setEmail] = useState('');
    const [message,setMessage] = useState('')
    const [alert,setAlert] = useState(undefined);
    function handleEmailSending(e)
    {
        e.preventDefault();
        console.log(email);
        console.log(ownerEmail);
        console.log(message)

        axios.post('http://localhost:3002/api/contacterOwner',{email,message,ownerEmail})
        .then(res => setAlert(res.data.message))
        .catch(error => console.error(error))
        
    }
    function handleCancelation(e)
    {
        e.preventDefault();
        props.hideForm();
    }

    return  <form className="show">
        
            <div className="formContainer">
                {alert && <p className="alert alert-success">{alert}</p>}
                <input className="emailContact" type="email" name="" id="" placeholder="Votre e-mail" onChange={(e) => setEmail(e.target.value)} />
                <textarea className="descriptionContact" name="" id="" cols="30" rows="10" onChange={(e) => setMessage(e.target.value)} placeholder="Description (par exemple : décrivez les objets dans le sac et l'endroit où il a été perdu)"></textarea>
                <button className="ActionButtons" onClick={handleEmailSending}  >Envoyer</button>
                <button className="CancelButton" onClick={handleCancelation} >Terminer</button>
            </div>
        </form>
}