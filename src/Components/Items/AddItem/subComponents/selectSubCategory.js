import axios from "axios";
import { useEffect, useState } from "react";




export default function SelectSubCategory(props)
{

    const selectedCategory = props.selectedCategory;
    const [subCategoriesList,setSubCategoriesList] = useState([]);

    const [selectedSubCategory,setSelectedSubCategory] = useState('');

    useEffect(() =>
{
    if(selectedCategory !== "")
    {
        
        axios.get(`http://localhost:3002/api/data/subCategories/${selectedCategory}`)
        .then(res =>
        {
            // console.log(res.data)
            
            setSubCategoriesList(res.data)
        })
        .catch(error =>
        {
            console.error("Error fetching Data (SubCategory)" + error)
        })
    }


},[selectedCategory])


    function setSubCategory(x)
    {
        setSelectedSubCategory(x)
        props.setSubCategory(x)
    }

    return <div>
        
        <label htmlFor="">Sous-Categorie:<span className="obligationStar">*</span></label>
        <select name="" id="" value={selectedSubCategory} onChange={(e) => setSubCategory(e.target.value)} >
            <option value="">Choisissez la catégorie</option>
            {
               (selectedCategory !== null) && subCategoriesList.map((c,index) => <option key={index} value={c}>{c}</option>)
            }
        </select>
    </div>
}