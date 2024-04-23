

import { useEffect,useState } from "react";
import axios from "axios";
export default function AddLostItem()
{



   
   const [imageData, setImageData] = useState(null);

    useEffect(() => {
    const fetchImageData = async () => {
      try {
        await axios.get(`http://localhost:3002/api/data/image`)
        .then(res =>
        {
            setImageData(res.data);
            console.log(res.data);
           
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