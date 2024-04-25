import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';


const MySelectPhones = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [options,setOptions] = useState([]);
  useEffect(() =>
{
  axios.get("http://localhost:3002/api/data/parametres/phones")
  .then(res => 
  {
    setOptions(res.data)
    console.log(res.data)
  })
  .catch(error => console.error(error));
},[])

  const handleChange = (selectedOption) => {

    setSelectedOption(selectedOption);
    
    if (selectedOption) {
      const selectedValue = selectedOption.label;
      const selectedGroup = options.find(group => group.options.some(opt => opt.value === selectedOption.value));
      const groupLabel = selectedGroup ? selectedGroup.label : '';
      console.log(`Option: ${selectedValue}, Group: ${groupLabel}`);
    }
  };

  return (
    <div style={{ width: '200px' }}>
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={options}
        placeholder="Choisissez un categorie"
      />
    </div>
  );
};

export default MySelectPhones;
