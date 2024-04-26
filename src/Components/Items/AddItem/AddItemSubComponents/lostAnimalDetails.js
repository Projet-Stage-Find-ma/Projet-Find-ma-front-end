

import styles from '../addLostItem.module.css';
export default function LostAnimalDetails(props)
{


    return <div>

        <div className="inputContainer">
            <label htmlFor="" className="lostLabel">Race:</label>
            <input type="text" name="" id="" className={styles.dataInputs} />
        </div>

        <div className="inputContainer">
            <label htmlFor="" className="lostLabel">Coleur:</label>
            <input type="text" name="" id="" className={styles.dataInputs} />
        </div>

    </div>
}