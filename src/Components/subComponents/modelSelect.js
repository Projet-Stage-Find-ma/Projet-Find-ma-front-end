
import { useState,useEffect } from "react";
import axios from "axios";
import Select from 'react-select'
import style from '../Items/AddItem/addLostItem.module.css'
export default function ModelSelect(props)
{
    const [options,setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() =>
  {
    axios.get("http://localhost:3002/api/data/parametres/phones")
    .then(res => 
    {
      setOptions(res.data)
      
    })
    .catch(error => console.error(error));
  },[])


  const handleChange = (selectedOption) => {

    setSelectedOption(selectedOption);
    
    if (selectedOption) {
      const selectedValue = selectedOption.label;
      const selectedGroup = options.find(group => group.options.some(opt => opt.value === selectedOption.value));
      const groupLabel = selectedGroup ? selectedGroup.label : '';
     
     props.setModel({"Marque":groupLabel,"Model":selectedValue})
      console.log({"Marque":groupLabel,"Model":selectedValue})
    }
  };

  return <div id="modelSelect" className="MyReactSelect">
    <label htmlFor=""  >Marque/Model:</label>
    <Select
    value={selectedOption}
    onChange={handleChange}
    options={options}
    placeholder="Choisissez la marque et le modéle de téléphone"
    className='reactSelect'
    
    
    
    />
  </div>
}