import React from "react";
import "./Addphone.css";

export default function Addphone() {
    return (
        <div className="globalContainer">
            <h1>Ajouter Mon IMEI</h1>
            <form action="">
                <div className="formContainer">
                    <div className="part1">
                        <div className="label-input-container">
                            <label htmlFor="IMEI1">IMEI 1:</label>
                            <input type="text" id="IMEI1" />
                        </div>
                        <div className="label-input-container">
                            <label htmlFor="IMEI2">IMEI 2 (Optionnel):</label>
                            <input type="text" id="IMEI2" />
                        </div>
                        <div className="label-input-container">
                            <label htmlFor="ns">Numéro de série:</label>
                            <input type="text" id="ns" />
                        </div>
                        <div className="label-input-container">
                            <label htmlFor="marque">Marque:</label>
                            <input type="text" id="marque" />
                        </div>
                        <div className="label-input-container">
                            <label htmlFor="model">Modèle:</label>
                            <input type="text" id="model" />
                        </div>
                        <div className="label-input-container">
                            <label htmlFor="couleur">Couleur:</label>
                            <input type="text" id="couleur" />
                        </div>
                    </div>
                    <div className="part2">
                        <p>Entrez un numéro pour vous contacter au cas où vous perdiez votre téléphone</p>
                        <div className="label-input-container">
                            <label htmlFor="tel1">Tel 1:</label>
                            <input type="text" id="tel1" />
                        </div>
                        <div className="label-input-container">
                            <label htmlFor="tel2">Tel 2:</label>
                            <input type="text" id="tel2" />
                        </div>
                        <div className="label-input-container">
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" />
                        </div>
                        <div className="label-input-container">
                            <label htmlFor="statut">Statut:</label>
                            <select id="statut">
                                <option value="">Choisissez l'état de votre appareil</option>
                                <option value="volé">Volé</option>
                                <option value="perdu">Perdu</option>
                                <option value="possédé">Possédé</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="myButtons">
                <input type="submit" value="Confirmer" />
                <input type="reset" value="Annuler" />
                </div>
            </form>
        </div>
    );
}
