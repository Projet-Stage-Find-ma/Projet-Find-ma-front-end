import React, { useState} from "react";
import "./phone.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import axios from "axios";
import ContacterOwner from "./ContactOwner";

export default function Phone() {
    const [imei, setImei] = useState("");
    const [tel, setTel] = useState(null);
    const [msg, setMsg] = useState("");

    

    async function handleSubmit(e) {
        e.preventDefault();
        
        await axios.post("http://localhost:3002/api/getPhoneByIMEI", { imei })
        .then((res) =>
        {
        // setTel(res.data.tel);
        console.log(res.data[0]);
        setTel(res.data[0]);
        setMsg("");
        })
        .catch(err =>
        {
            console.error('Error fetching phone by IMEI:', err);
            setTel(null);
            setMsg("Une erreur s'est produite lors de la recherche du téléphone par IMEI");
        });

        
    }
    

    return (
        <>
           <div className="GlobalContainer">
            <button className="Ajout">
                <Link to="/addphone" style={{"color":"white"}}> <FontAwesomeIcon icon={faCirclePlus}/> Ajouter mon IMEI</Link>
            </button>
            <button className="Ajout">
                <Link to="/verifyIMEI" style={{"color":"white"}}> <FontAwesomeIcon icon={faCirclePlus}/> Acheter un téléphone</Link>
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
                        <p>Numéro de téléphone: {tel.tel1}</p>
                        <p>Numéro de téléphone 2: {tel.tel2}</p>
                        <p >Statut: <span style={{color:"red"}}>{tel.status}</span> </p>
                        <ContacterOwner ownerEmail={tel.email}/>
                        </div>
                        <div className="teleinfo">
                        <p>Numéro de série: {tel.serialNumber}</p>
                        <p>IMEI1 : {tel.imei1}</p>
                        <p>IMEI2 : {tel.imei2}</p>
                        <p>Marque: {tel.brand}</p>
                        <p>Modèle: {tel.model}</p>
                        <p>Couleur: {tel.color}</p>
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
