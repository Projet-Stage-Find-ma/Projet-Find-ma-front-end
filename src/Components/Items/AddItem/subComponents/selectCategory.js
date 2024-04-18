import axios from "axios";
import { useEffect, useState } from "react"





export default function SelectCategory(props)
{

    const [categoriesList,setCategoriesList]  = useState([]);
    

    useEffect(() =>
{
     axios.get("http://localhost:3002/api/data/categories")
    .then( res =>
    {
        setCategoriesList(res.data);
        
    })
    .catch(error =>{
        console.error('Error fetching categories')
    })
    
},[])

    function setCategory(x)
    {
        props.setCategory(x)
    }

    return <div>
        <label htmlFor="">Categorie:<span className="obligationStar">*</span></label>
        <select name="" id="" onChange={(e) => setCategory(e.target.value)} >
            <option value="">Choisissez la catégorie</option>
            {
                categoriesList.map((x,index) => <option  key={index} value={x} >{x}</option>)
            }
        </select>
    </div>
}