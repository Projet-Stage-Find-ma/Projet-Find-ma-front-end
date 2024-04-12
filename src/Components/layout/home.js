import React from "react";
import "./acceuil.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function Acceuil()
{
   
    return <>
    
    <div className="container1Acceuil">
    
        
            <div className="Part1Container1">
                <h1>Retrouvez, vérifier et déclarez en toute simplicité</h1>
                <p>Avec notre service, trouvez vos objets égarés, vérifiez lz statut d'un téléphone avant l'achat, et signalez les trouvailles ou les pertes. Facile et rapide!</p>
                <button>Telephone</button>
                <button>Objets perdus</button>
                <button>Objets trouvés</button>
           
            </div>
            <div className="Part2Container1" >
                <h1>Find.ma</h1>
            </div>

    </div>
    <div className="Container2Acceuil mb-5">
    <h1>Nos Services</h1>
    <div className="row">
        <div className="col-md-3 col-sm-12 ms-md-3" style={{"backgroundColor":"white"}}>
            <h5>Déclarer votre téléphone</h5>
            <p>Avec un statut volé, perdu ou possédé</p>
        </div>
        <div className="col-1 mt-4">
            <FontAwesomeIcon icon={faArrowRight} style={{color:"white",marginLeft:"45px"}}/>
        </div>
        <div className="col-md-3 col-sm-12" style={{"backgroundColor":"white"}}>
            <h5>Quelqu'un a cherché votre IMEI</h5>
            <p>Il va le trouver dans notre système</p>
        </div>
        <div className="col-1 mt-4">
            <FontAwesomeIcon icon={faArrowRight} style={{color:"white",marginLeft:"45px"}}/>
        </div>
        <div className="col-md-3 col-sm-12" style={{"backgroundColor":"white"}}>
            <h5>Notification par E-mail</h5>
            <p>Si le statut est volé ou perdu, nous vous enverrons un e-mail contenant des informations pouvant vous aider à le retrouver</p>
        </div>
    </div>
    <div className="row mt-5 mb-5">
        <div className="col-md-3 col-sm-12 ms-md-3" style={{"backgroundColor":"white"}}>
            <h5>Déclarer un objet perdu/trouvé</h5>
            <p>Vous pouvez ajouter vos objets perdus ou trouvés avec facilité</p>
        </div>
        <div className="col-1 mt-4">
            <FontAwesomeIcon icon={faArrowRight} style={{color:"white",marginLeft:"45px"}}/>
        </div>
        <div className="col-md-3 col-sm-12" style={{"backgroundColor":"white"}}>
            <h5>Le propriétaire a retrouvé son objet/Quelqu'un a trouvé le propriétaire</h5>
            <p>Vous pouvez être en contact</p>
        </div>
        <div className="col-1 mt-4">
            <FontAwesomeIcon icon={faArrowRight} style={{color:"white",marginLeft:"45px"}}/>
        </div>
        <div className="col-md-3 col-sm-12 me-1" style={{"backgroundColor":"white"}}>
            <h5>Récupérer vos objets</h5>
            <p>Récupérez vos objets dès que possible</p>
        </div>
    </div>
</div>


   
    </>


}