

import { useState } from 'react';
import styles from '../addLostItem.module.css';
export default function LostAnimalDetails(props)
{
   
   

    function handleInputs(e)
    {
        
       const key = e.target.name;
       const value = e.target.value;
       
        props.setAnimal({key,value});
    }
   
  

    return <div>

        <div className="inputContainer">
            <label htmlFor="" className="lostLabel">Nom:</label>
            <input type="text" name="Nom" id="" value={(props.modifyData && props.modifyData.animalName)}  className={styles.dataInputs} onChange={(e) => handleInputs(e)} />
        </div>

        <div className="inputContainer">
            <label htmlFor="" className="lostLabel">Race:</label>
            <input type="text" name="Race" id="" value={(props.modifyData && props.modifyData.animalRace)} className={styles.dataInputs} onChange={(e) => handleInputs(e)}  />
        </div>

        <div className="inputContainer">
            <label htmlFor="" className="lostLabel">Couleur:</label>
            <input type="text" name="Couleur" id="" value={(props.modifyData && props.modifyData.animalColor)} className={styles.dataInputs} onChange={(e) => handleInputs(e)}  />
        </div>

    </div>
}