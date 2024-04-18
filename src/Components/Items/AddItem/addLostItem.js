

import { useEffect,useState } from "react";
import axios from "axios";
export default function AddLostItem()
{



   
   const [imageData, setImageData] = useState(null);

    useEffect(() => {
    const fetchImageData = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/api/data/image`, {
          responseType: 'arraybuffer' // Ensure response is treated as binary data
        });
        const imageBlob = new Blob([response.data]);
        const imageUrl = URL.createObjectURL(imageBlob);
        setImageData(imageUrl);
        console.log(response.data);
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