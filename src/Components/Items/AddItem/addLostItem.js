

import { useEffect,useState } from "react";
import axios from "axios";
export default function AddLostItem()
{



   
   const [imageData, setImageData] = useState(null);

    useEffect(() => {
    const fetchImageData = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/api/data/image`)
        .then(res =>
        {
            setImageData(`http://localhost:3002/${res.data.image}`);
            console.log(res.data);
            console.log(`http://localhost:3002/${res.data.image}`)
        });
        
        
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImageData();

    return () => {
      // Cleanup function to revoke object URL
      if (imageData) {
        URL.revokeObjectURL(imageData);
      }
    };
  }, []);

  return <img src={imageData} alt="Found Object" />;


}