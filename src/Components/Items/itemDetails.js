
import { useState } from "react";
import { useParams } from "react-router-dom"
import './itemDetails.css'
import ContactForm from "./contactForm";
export default function ItemDetails()
{

    const id = useParams().id;
    const [displayContact,setDisplayContact] = useState(false);


    function hideForm()
    {
        setDisplayContact(false);
    }

    return <div id="MainContainer" >
        <h1 id="detailsTitle">Les information sur l'objet</h1>

        <div id={displayContact?"dim":""} className="itemDetails">
            <div className="imageContainer">
                <img src="/media/backpack.jpg" alt="" width='250px' />
            </div>

            <div className="itemInformation">
                <p id="itemName">Sac femme rouge</p>
                <p><span className="labels">Catégorie:</span>Acessoire-femme </p>
                <p><span className="labels">Ville:</span>Marrakech</p>
                <p><span className="labels">Date:</span>10/05/2015</p>
                <p><span className="labels">Telephone:</span>0600112233</p>

                <div className="buttonContainer">
                    <button className="ActionButtons" onClick={()=>setDisplayContact(true)}>Contacter par E-mail</button>
                </div>
            </div>

           
        </div>
            {(displayContact?<ContactForm hideForm = {hideForm} ></ContactForm>:"")
            }
    </div>
}