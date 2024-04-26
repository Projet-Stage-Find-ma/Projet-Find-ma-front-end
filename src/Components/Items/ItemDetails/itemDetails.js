
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import './itemDetails.css'

import ItemOnPerson from "./itemOnPerson";
import axios from "axios";
import IsLost from "./itemDetailsSubComponents/isLost";
import IsPhone from "./itemDetailsSubComponents/isPhone";
import IsAnimal from "./itemDetailsSubComponents/isAnimal";

export default function ItemDetails()
{

    const id = useParams().id;
   
    const [itemData,setItemData] = useState({});
    const [itemDate,setItemDate] = useState("");
    const [isLoading, setIsLoading] = useState(true); 



    useEffect( () => 
{
    axios.get(`http://localhost:3002/api/data/ObjectDetails/${id}`)
    .then(res =>
    {
        
        setItemData(res.data[0])


        const IncomingDate  = res.data[0].creation_date;
        const date = new Date(IncomingDate);
        const formatedDate = date.toISOString().split('T')[0];
        setItemDate(formatedDate);
    })
    .catch(error => console.error(error))
    .finally(() =>{setIsLoading(false)})
},[id])

  

    if(isLoading)
    {
        return <div>Loading...</div>
    }

    return <div id="MainContainer" >
        <p id="ItemDetailsName">{itemData.details.Designation}</p>
        
        <div  className="itemDetails">
            <div className="imageContainer">
                <img src={`http://localhost:3002/${itemData.image}`} alt="" width='250px' height="300px" />
            </div>
            
            <div className="DataContainer">
            
                <div className="itemStaticData">
                    <p><span className="labels">Catégorie:</span>{itemData.subCategory}</p>
                    <p><span className="labels">Ville:</span>{itemData.city}</p>
                    <p><span className="labels">Date:</span>{itemDate}</p>
                    {itemData.type === 'lost' && <IsLost thisIitemData = {itemData}/>}
                </div>
                <div className="itemDynamicData">
                    { itemData.details.phoneNumber&&<ItemOnPerson contactPhone = {itemData.details.phoneNumber} contactEmail = {itemData.details.email} />}
                    {itemData.details.dropLocation && <p><span className="labels">Où trouver cet objet:</span>{itemData.details.dropLocation}</p>}
                </div>

            </div>
            
            {itemData.subCategory ==="Telephone" && <IsPhone thisIitemData = {itemData}/>}
            {itemData.category === "Animal" && itemData.subCategory === "Autre" && <IsAnimal thisIitemData = {itemData}/> }
           
        </div>

        
        
        
     </div>
}