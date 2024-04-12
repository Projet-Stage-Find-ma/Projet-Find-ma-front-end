import { useState } from 'react';
import './filter.css'

export default function SearchFilter(props)
{

    const categories = props.categoriesList;
    const cities = props.citiesList;
    const subCategories = props.subCategoriesList;


    const [searchedItem,setSearchedItem] = useState('');


    function handelSearch()
    {
        props.SearchFor(searchedItem);
    }
    

    return <div className='filter'>

       <div className="search-section">
            <div className="search">
                <input  type="text" name="" className="search-input" placeholder="Rechercher un objet" onChange={(e) => setSearchedItem(e.target.value)}  />
                <button className='top-section-button' onClick={handelSearch} >Rechercher</button>
            </div>
            
            <div className="ajouterObjet">
                
                <button className='top-section-button' id='ajouter' >
                <img src="media/add.png" width='28px' alt="" /> Ajouter un objet</button>
            </div>
       </div>

      
    
       <div className="filter-Section">
          
            <div className="selects-section">
                
                {/* Selecting by city */}
                <div className="filter-select-section" id='citiesList' >
                        <label className='filter-label' htmlFor="city">city: </label>
                        <select className='filter-select' name="city" id="city">
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
                        <select className='filter-select' name="categorie" id="categorie">
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
                        <select className='filter-select' name="sub-categorie" id="sub-categorie">
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