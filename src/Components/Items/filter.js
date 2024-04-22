import { useState } from 'react';
import './filter.css'
import { useNavigate, useParams } from 'react-router-dom';
import { getUserID } from '../UserConnection/connection';

export default function SearchFilter(props)
{

    const categories = props.categoriesList;
    const cities = props.citiesList;
    const subCategories = props.subCategoriesList;
    const navigate = useNavigate();

    const {type} = useParams();
    console.log("filter"+type);

    const [searchedItem,setSearchedItem] = useState('');
    const [searchedItemCity,setSearchedItemCity] = useState('');
    const [searchedItemCategory,setSearchedItemCategory] = useState('');
    const [searchedItemSubCategory,setSearchedItemSubCategory] = useState('');


    function handleSearch()
    {
        props.SearchFor(searchedItem,searchedItemCity,searchedItemCategory,searchedItemSubCategory);
    }
    
    function handleClickOnAjouter()
    {

        if(getUserID())
        {
            navigate(`/addObject/${type}`)
        }
        else
        {
            navigate('/userLogin')
        }
    }

    return <div className='filter'>

       <div className="search-section">
            <div className="search">
                <input  type="text" name="" className="search-input" placeholder="Rechercher un objet" onChange={(e) => setSearchedItem(e.target.value)}  />
                <button className='top-section-button' onClick={handleSearch} >Rechercher</button>
            </div>
            
            <div className="ajouterObjet">
                
                <button className='top-section-button' id='ajouter' onClick={handleClickOnAjouter} >
                <img src="/media/add.png" width='28px' alt="" /> Ajouter un objet</button>
            </div>
       </div>

      
    
       <div className="filter-Section">
          
            <div className="selects-section">
                
                {/* Selecting by city */}
                <div className="filter-select-section" id='citiesList' >
                        <label className='filter-label' htmlFor="city">city: </label>
                        <select className='filter-select' name="city" id="city" onChange={(e) => setSearchedItemCity(e.target.value)} >
                            <option value=""></option>
                            {
                                cities.map((c,index) => {

                                    return <option key={index} value={c}>{c}</option>
                                })
                            }
                        </select>
                </div>


                    {/* Selecting by category */}      
                <div className="filter-select-section" id='categoriesList' >
                        <label className='filter-label' htmlFor="categorie">Categorie:</label>
                        <select className='filter-select' name="categorie" id="categorie" onChange={(e) => setSearchedItemCategory(e.target.value)}>
                            <option value=""></option>
                            {
                                categories.map((c,index) => {

                                    return <option   key={index} value={c}>{c}</option>
                                })
                            }

                        </select>
                </div>

                {/* Selecting by Sub-category */}  
                <div className="filter-select-section" id='sub-categoriesList' >
                        <label className='filter-label' htmlFor="sub-categorie">sub-Categorie:</label>
                        <select className='filter-select' name="sub-categorie" id="sub-categorie" onChange={(e) => setSearchedItemSubCategory(e.target.value)}>
                            <option value=""></option>
                            {
                                subCategories.map((c,index) => {

                                    return <option  key={index}  value={c}>{c}</option>
                                })
                            }

                        </select>
                </div>
            </div>

           <div className="date-filter">
                    <label className='date-label' htmlFor="date">Date:</label>
                    <input className='date-input' type="date" name="" id="" />
                    <input className='date-input' type="date" name="" id=""  />
           </div>
        </div>
      

       
    </div>
}