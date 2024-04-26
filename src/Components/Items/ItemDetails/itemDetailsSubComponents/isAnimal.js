



export default function IsAnimal(props)
{

    const thisIitemData = props.thisIitemData.details;



    return <div className="isContainer">

        <p><span className="labels" htmlFor="">Nom:</span>{thisIitemData.animalName}</p>
        <p><span className="labels" htmlFor="">Race:</span>{thisIitemData.animalRace}</p>
        <p><span className="labels" htmlFor="">Couleur:</span>{thisIitemData.animalColor}</p>
        
        
       
    </div>
}