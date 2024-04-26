
import Select from 'react-select';
import { useState,useEffect } from 'react';
import axios from 'axios';



export default function CategoryDropDown(props)
{




    const [selectedOption, setSelectedOption] = useState(null);
    const [options,setOptions] = useState([]);
    const [displayCustomCategory,setDisplayCustomCategory]  = useState(false)
    

  useEffect(() =>
    {
        axios.get("http://localhost:3002/api/data/parametres/categories")
        .then(res => 
        {
            setOptions(res.data)

            
            
            
        })
        .then(() =>
      {
        if(props.modifyData)
            {
              
              console.log(props.modifyData)
              console.log(props.modifyData.subCategory)

            }
      })
        .catch(error => console.error(error));
    },[])
   
    const handleChange = (selectedOption) => {
      
        setSelectedOption(selectedOption);
        
        if (selectedOption) {
          
          if(selectedOption.label === 'Autre')
          {
            setDisplayCustomCategory(true);
            
          }
          else
          {
            setDisplayCustomCategory(false)
          }

          const selectedValue = selectedOption.label;
          const selectedGroup = options.find(group => group.options.some(opt => opt.value === selectedOption.value));
          const groupLabel = selectedGroup ? selectedGroup.label : '';

          
           props.setCategory({subCategory:selectedValue,category:groupLabel})
          
          
       
        }
    };


    function handleCustomCategory(e)
    {
      props.setCustomCategory(e.target.value);
    }
    
 
  return (
    <div className="MyReactSelect" >
     <label htmlFor="">Categorie:</label>
      <div>
      <Select value={selectedOption} onChange={handleChange} options={options} placeholder="Choisissez un categorie" className='reactSelect'/>
      {(displayCustomCategory &&  !props.calledInSearch && !props.calledInLostItem)?<input type="text" name="" id="customCategory" onChange={handleCustomCategory} placeholder="Entrez la catégorie de l'objet"  />:""}

      </div>
    </div>
  );
}