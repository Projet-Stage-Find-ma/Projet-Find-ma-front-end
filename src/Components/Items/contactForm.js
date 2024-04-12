
import { useState } from "react";

export default function ContactForm(props)
{


    function handleCancelation(e)
    {
        e.preventDefault();
        props.hideForm();
    }

    return  <form className="show">
            <div className="formContainer">
                <input className="emailContact" type="email" name="" id="" placeholder="Votre e-mail" />
                <textarea className="descriptionContact" name="" id="" cols="30" rows="10" placeholder="Description (par exemple : décrivez les objets dans le sac et l'endroit où il a été perdu)"></textarea>
                <button className="ActionButtons"  >Envoyer</button>
                <button className="CancelButton" onClick={handleCancelation} >Annuler</button>
            </div>
        </form>
}