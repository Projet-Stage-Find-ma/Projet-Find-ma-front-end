import ContactForm from "./contactForm"

import React,{ useState } from "react";

export default function ItemOnPerson(props)
{
    const [displayContact,setDisplayContact] = useState(false);

    function hideForm()
    {
        setDisplayContact(false);
    }

    return <div>

        <div className="thiItemOnPerson">
            <p><span className="labels">Telephone:</span>{props.contactPhone} </p>
            {props.contactEmail && <button className="ActionButtons" onClick={()=>setDisplayContact(true)}>Contacter par E-mail</button>}
        </div>

        {(displayContact?<ContactForm hideForm = {hideForm} contactEmail = {props.contactEmail} ></ContactForm>:"")
            }
    </div>
                
}
                


