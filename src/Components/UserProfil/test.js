import axios from "axios";
import { useEffect, useState } from "react";

export default function Test()
{
     const [brand,setBrand]=useState([])

    async function handleSubmit(){
      
    
        
        try {
            const response = await axios.get("https://mobile-phones2.p.rapidapi.com/brands",{
                headers:{
                    'X-RapidAPI-Key': '3910271e9dmsh3df2807390ebbb1p1893f1jsn7d772fa87a07',
            'X-RapidAPI-Host': 'mobile-phones2.p.rapidapi.com'
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
       
        
    }

     return <button  onClick={handleSubmit}>Clicker</button>
}