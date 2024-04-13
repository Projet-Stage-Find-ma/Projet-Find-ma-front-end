import React, { useState } from "react";
import "./phone.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

export default function Phone() {
    const [imei, setImei] = useState("");
    const [tel, setTel] = useState(null);
    const [msg, setMsg] = useState("");

    const telephones = [
        {"id":1,"IMEI1":123456789,"IMEI2":10101010,"serialNumber":898989889,"model":"iphone 14","marque":"Iphone","couleur":"noir","statut":"volé","owner":"owner1","numero":"0602013014"},
        {"id":2,"IMEI1":123456789,"IMEI2":10101010,"serialNumber":898989889,"marque":"Redmi","model":"Redmi","couleur":"Bleu","statut":"possédé","owner":"owner2","numero":"0602013014"}
    ];

    function handleSubmit(e) {
        e.preventDefault();
        const foundPhone = telephones.find((phone) => phone.IMEI1 == imei || phone.IMEI2 == imei);
        if (foundPhone) {
            setTel(foundPhone);
            setMsg("");
        } else {
            setTel(null);
            setMsg("Aucun téléphone avec cet IMEI trouvé");
        }
    }

    return (
        <>
           <div className="GlobalContainer">
            <button className="Ajout">
                <Link to="/addphone" style={{"color":"white"}}> <FontAwesomeIcon icon={faCirclePlus}/> Ajouter mon IMEI</Link>
            </button>
            <div className="containerPhone">
                <h1>Rechercher un IMEI</h1>
                <form action="" className="myform" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Entrez le code IMEI que vous souhaitez rechercher" onChange={(e) => setImei(e.target.value)} />
                    <button type="submit">Rechercher</button>
                </form>
                {tel !== null ? (
                    <div className="myPhone">
                        <div className="ownerinfo">
                        <p>Propriétaire: {tel.owner}</p>
                        <p>Numéro de téléphone: {tel.numero}</p>
                        <p >Statut: <span style={{color:"red"}}>{tel.statut}</span> </p>
                        <button>Contacter le propriétaire</button>
                        </div>
                        <div className="teleinfo">
                        <p>Numéro de série: {tel.serialNumber}</p>
                        <p>IMEI1 : {tel.IMEI1}</p>
                        <p>IMEI2 : {tel.IMEI2}</p>
                        <p>Marque: {tel.marque}</p>
                        <p>Modèle: {tel.model}</p>
                        <p>Couleur: {tel.couleur}</p>
                        </div>
                    </div>
                ) : (
                    <p>{msg}</p>
                )}
            </div>
            </div>
        </>
    );
}
