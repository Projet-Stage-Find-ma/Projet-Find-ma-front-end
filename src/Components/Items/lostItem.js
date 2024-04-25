
import { Link } from "react-router-dom"
import './lostitem.css'

export default function LostItem(props)
{

    


    return <div className="item">
        <img className="item-image" src={`http://localhost:3002/${props.data.image}`} alt="" />
        <div className="info">
            <p>Designation: <span>{props.data.details.objectName}</span></p>
            <p>Catégorie: <span>{props.data.category}</span></p>
            <p>Sous-Categorie: <span>{props.data.subCategory}</span></p>
            <p>Ville: <span>{props.data.city}</span></p>
            
        </div>
       <Link className='detail-button' to={`/item/${props.data.id}`} >Voir Plus</Link>
    </div>
}