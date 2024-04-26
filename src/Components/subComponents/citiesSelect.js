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
  
    })
    .catch(error => console.error(error))
},[])


function handleChange(selectedOption)
{
    setSelectedOption(selectedOption)
    props.setCity(selectedOption.value)
}



    return <div  id='citySelect'>
        <label htmlFor="">Ville</label>
        <Select className='reactSelect' options={options} onChange={handleChange} value={selectedOption}  placeholder="Choisissez une ville" />
    </div>
}