


export default function IsLost(props)
{

    const thisIitemData = props.thisIitemData.details;

    console.log("isLostData")
    console.log(thisIitemData);

    return <div className="isLostContainer">

        <p><span className="labels" htmlFor="">Designation:</span>{thisIitemData.Designation}</p>
        <p><span className="labels" htmlFor="">Endroit:</span>{thisIitemData.Endroit}</p>
        <p><span className="labels" htmlFor="">Description:</span>{thisIitemData.Description}</p>
        
       
    </div>
}