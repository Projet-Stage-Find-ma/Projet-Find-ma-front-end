import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from 'react-select';

export default function CitiesSelect(props)
{
    const [selectedOption, setSelectedOption] = useState(null);
    const [options,setOptions] = useState([]);


    useEffect(() =>
{
    axios.get('http://localhost:3002/api/data/parametres/cities')
    .then(res => {
        setOptions(res.data)
        const newOption = (props.data) && {label:props.data.city,value:props.data.city}
        setSelectedOption(newOption);
       
  
    })
    
        
    .catch(error => console.error(error))
},[props.data])


function handleChange(selectedOption)
{
    setSelectedOption(selectedOption)
    props.setCity(selectedOption.value)
    console.log(selectedOption)
}



    return <div  className="MyReactSelect">
        <label htmlFor="">Ville:</label>
        <Select className='reactSelect' options={options} onChange={handleChange} value={selectedOption}  placeholder="Choisissez une ville" />
    </div>
}