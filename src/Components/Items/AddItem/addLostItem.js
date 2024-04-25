import { useState,useRef } from "react";



import imageCompression from "browser-image-compression";
import { useNavigate } from "react-router-dom";

import styles from './addLostItem.module.css'

import axios from "axios";
import CategoryDropDown from "../../subComponents/categorySelect";
import CitiesSelect from "../../subComponents/citiesSelect";



export default function AddLostItem()
{

    const [selectedOption, setSelectedOption] = useState('onPerson');
    const [imgHolder,setImgHolder] = useState('/media/imageHolder.png')
    const fileInputRef = useRef(null);

    const [data,setData] = useState({category:"",subCategory:"",details:{objectName:"",objectLocation:"onPerson"}});

    const [errorMessage,setErrorMessage] = useState("");

    const [phoneNumber,setPhoneNumber] = useState('');
    const [email,setEmail] = useState('');
    const [dropLocation,setDropLocation] = useState('');
   
    
    
    const navigate = useNavigate();




    //Handling checked radio buttons
    function handleCheckBox(e)
    {
        
        if(e.target.value === "onPerson")
        {
            delete data.details.dropLocation;
            setDropLocation("");
            setSelectedOption("onPerson")
            setData({...data,details:{...data.details,objectLocation:"onPerson"}})
            
        }
        else if(e.target.value === 'offPerson')
        {
            delete data.details.phoneNumber;
            delete data.details.email;
            setPhoneNumber("");
            setEmail("");
            setSelectedOption("offPerson")
            setData({...data,details:{...data.details,objectLocation:"offPerson"}})
            
        }

        
            
    }


    // Displaying the uploaded Image to the user
    const  handleUploadedImage = async (event) =>
    {

        const options = {
            maxSizeMb:1,
            maxWidthOrHeight: 500, 
            useWebWorker: true
        }
        const file = event.target.files[0];
        

        if(!file.type.startsWith('image/'))
        {
            alert("Seules les images sont autorisées");
            return
        }

        try
        {
            const compressedImage  =  await imageCompression(file,options);
            setData({...data,image:compressedImage});

            const reader = new FileReader();
            reader.onload = (event) =>
            {
                setImgHolder(event.target.result);              
            }


            if(file)
            {
                reader.readAsDataURL(compressedImage);
            
            }
            
        }
        catch(err)
        {
            console.error(err);
        }

        

        
    }

    //Onclick on the image a file upload window triggers
    function HandleImageClick()
    {
        fileInputRef.current.click();
    }


    function HandleSubmit(event)
    {
        let dataToSend = data;
        let allowsendingData = true;
        
        event.preventDefault();
        
       
        if(selectedOption === 'onPerson')
        {
            delete dataToSend.details.dropLocation;
            
            if(phoneNumber.trim() === "")
             {
                setErrorMessage("Veuillez saisir un numéro de téléphone afin que le propriétaire puisse vous contacter")
                allowsendingData = false;
             }

            else
            {
               setErrorMessage("");
               dataToSend = {...dataToSend,details:{...dataToSend.details,phoneNumber}}
               
               if(email.trim() !== "")
               dataToSend = {...dataToSend,details:{...dataToSend.details,email}}  

               allowsendingData = true;
            }
        }
        else
        {
            
            delete dataToSend.details.phoneNumber;
            delete dataToSend.details.email;
            if(dropLocation.trim() === "" )
            {
                allowsendingData = false;
                setErrorMessage("Merci de préciser l'endroit où vous déposerez l'objet que vous avez trouvé")
            }
            else
            {
                setErrorMessage("");
                dataToSend = {...dataToSend,details:{...dataToSend.details,dropLocation}}  
            }
        }

        if(dataToSend.category === '' || !('category' in dataToSend))
        {
            allowsendingData = false;
            setErrorMessage("Veuillez sélectionner une catégorie")
        }

        if(dataToSend.subCategory === '' || !('subCategory' in dataToSend) )
        {
            allowsendingData = false;
            setErrorMessage("Veuillez sélectionner une catégorie")
        }
        else if(dataToSend.subCategory !== 'Autre')
        {
            delete dataToSend.details.customCategory;
        }

        if(dataToSend.city === '' || !('city' in dataToSend))
        {
            allowsendingData = false;
            console.log("Veuillez sélectionner une ville")
        
        }

        if(imgHolder === "/media/imageHolder.png")
        {
            allowsendingData = false;
            console.log("Image validation")
        }

        
        if(dataToSend.details.objectName === "")
        {
            allowsendingData = false;
            console.log("name validation")
        }

        if(allowsendingData)
        {

            
            const token =  localStorage.getItem('token');
            
            axios.post(`http://localhost:3002/api/data/createFoundObject`,dataToSend,{
                headers:{
                    'Content-Type':'multipart/form-data',
                    'Authorization':`Bearer ${token}`
                }
            })
            .then(res => console.log(res.data))
            .then(() =>  navigate('/itemsList/found'))
            .catch(err => console.error(err))
            console.log(dataToSend);
            
            
           
            
        }
        
        
   
        



    }

    //adding categories
    function setCategory(x)
    {
       
        setData({...data,category:x.category,subCategory:x.subCategory})
        console.log(x)
     
    }

    function setCustomCategory(x)
    {
        setData({...data,details:{...data.details,customCategory:x}})
    }

    function setCity(x)
    {
    
        setData({...data,city:x})
    }


   

    



    return <form id="addFoundItemForm" onSubmit={HandleSubmit} >


        <p>{errorMessage}</p>
       <div id={styles.addLostItemMainContainer}>
            <div className="mainData">
                <div id={styles.ImageContainer} onClick={HandleImageClick} >
                    <label htmlFor="image">Image:<span className="obligationStar">*</span></label>
                    <div id={styles.imageHolder}>
                        <img src={imgHolder} alt="" width='250px' height='250px' />
                    </div>
                    <input type="file" name="Image" id="image" ref={fileInputRef} style={{display:'none'}} onChange={handleUploadedImage} accept="image/*" />
                </div>

                <div className="itemNameContainer">
                    <label htmlFor="itemName">Designation</label>
                    <input className={styles.dataInputs}  type="text" name="" id="itemName"onChange={(e) => setData({...data,details:{...data.details,objectName:e.target.value}}) } />
                </div>

                <div className="lostItemLocationContainer">
                    <label htmlFor="lostItemLocation">Endroit:</label>
                    <input className={styles.dataInputs}  type="text" name="" id="lostItemLocation"  onChange={(e) => setData({...data,details:{...data.details,objectLosingLocation:e.target.value}}) } placeholder="Où avez-vous perdu l'objet" />
                </div>

                <CitiesSelect setCity = {setCity}/>

                <div id={styles.itemLosingDescirptionContainer}>
                  <label htmlFor="">Desription:</label>
                  <textarea className={styles.dataInputs} name="" id="" cols="30" rows="10" placeholder="Vous pouvez écrire plus de détails sur l'objet que vous avez perdu pour aider à l'identifier"></textarea>
                </div>

            
            </div>

            <div className="LostItemCategorySelectionContainer">
            <CategoryDropDown setCategory = {setCategory} setCustomCategory = {setCustomCategory} />
            </div>


            </div>

       

        <button className="ConfirmButtton">Confirmer</button>
    </form>
}