import axios from "axios"
import { useEffect, useState } from "react"



export default function SelectCities(props)
{
    const [citiesList,setCitiesList] = useState([]);

    function setCity(x)
    {
        props.setCity(x)
    }

    useEffect(() =>
{
    axios.get("http://localhost:3002/api/data/cities")
    .then(res =>
    {
        setCitiesList(res.data);
    })
    .catch( error =>
    {
        console.error(error);
    })
},[])

    return <div>
        <label htmlFor="">Ville: <span className="obligationStar">*</span> </label>
        <select name="" id="" onChange={(e) => setCity(e.target.value)}>
            <option value="">Choisissez la ville</option>
            {
                    citiesList.map((x,index) => <option key={index} value={x}>{x}</option>)
            }
        </select>
    </div>
}