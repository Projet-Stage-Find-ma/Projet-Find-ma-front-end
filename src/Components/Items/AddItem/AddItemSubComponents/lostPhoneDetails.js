import ModelSelect from '../../../subComponents/modelSelect';
import styles from '../addLostItem.module.css';
import PhoneColorsSelect from '../../../subComponents/phoneColorSelect';
export default function LostPhoneDetails(props)
{




    return <div className={styles.phoneDetailsContainer}>
        <div className={styles.PhoneDetailsInput}>
            <label htmlFor="">IMEI:</label>
            <input className={styles.dataInputs}  value={(props.modifyData) && props.modifyData.imei} type="text" name="" id="" onChange={e => props.setImei(e.target.value)} />
        </div>

        <div className={styles.PhoneDetailsInput}>
            <label htmlFor="">Numéro de série:</label>
            <input className={styles.dataInputs} type="text" value={(props.modifyData) && props.modifyData.serialNumber}  name="" id="" onChange={e => props.setSerialNumber(e.target.value)} />
        </div>


     
         <ModelSelect setModel = {props.setModel}  />
      
        <PhoneColorsSelect setPhoneColor = {props.setPhoneColor} />
        


      
    </div>
}