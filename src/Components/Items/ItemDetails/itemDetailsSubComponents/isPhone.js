


export default function IsPhone(props)
{

    const thisIitemData = props.thisIitemData.details;

    console.log("isLostData")
    console.log(thisIitemData);

    return <div className="isPhoneContainer">

        <p><span className="labels" htmlFor="">imei:</span>{thisIitemData.imei}</p>
        <p><span className="labels" htmlFor="">Numero de serie:</span>{thisIitemData.serialNumber}</p>
        <p><span className="labels" htmlFor="">Marque:</span>{thisIitemData.marque}</p>
        <p><span className="labels" htmlFor="">Model:</span>{thisIitemData.model}</p>
        <p><span className="labels" htmlFor="">Couleur:</span>{thisIitemData.phoneColor}</p>
        
       
    </div>
}