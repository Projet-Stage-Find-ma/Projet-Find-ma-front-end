import { useState } from 'react';
import './filter.css'
import { useNavigate, useParams } from 'react-router-dom';
import { getUserID } from '../UserConnection/connection';


import CategoryDropDown from '../subComponents/categorySelect';
import CitiesSelect from '../subComponents/citiesSelect';

export default function SearchFilter(props)
{

    
    const navigate = useNavigate();

    const {type} = useParams();
    // console.log("filter"+type);

    const [searchedItem,setSearchedItem] = useState('');
    const [searchedItemCity,setSearchedItemCity] = useState('');
    
    const [searchedItemSubCategory,setSearchedItemSubCategory] = useState('');
  


    function handleSearch()
    {
        props.SearchFor(searchedItem,searchedItemCity,searchedItemSubCategory);
    }

    function setCategory(cat)
    {
      
        setSearchedItemSubCategory(cat);
        
    }

    

    function setCity(x)
    {
        setSearchedItemCity(x);
        
    }

    
    function handleClickOnAjouter()
    {

        if(getUserID() || type === 'found')
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
          
           
                
               


                <CategoryDropDown setCategory = {setCategory} calledInSearch = {true} />
                <CitiesSelect setCity = {setCity}/>
              
               
          
        </div>
      

       </div>
    
}