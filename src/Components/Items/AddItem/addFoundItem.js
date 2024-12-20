import { useState,useRef } from "react";



import imageCompression from "browser-image-compression";
import { useNavigate } from "react-router-dom";

import styles from './addFoundItem.module.css'
import axios from "axios";
import CategoryDropDown from "../../subComponents/categorySelect";
import CitiesSelect from "../../subComponents/citiesSelect";



export default function AddFoundItem()
{

    const [selectedOption, setSelectedOption] = useState('onPerson');
    const [imgHolder,setImgHolder] = useState('/media/imageHolder.png')
    const fileInputRef = useRef(null);

    const [data,setData] = useState({category:"",subCategory:"",details:{Designation:"",objectLocation:"onPerson"},type:"found"});

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
            setErrorMessage("Veuillez sélectionner un catégorie")
        }

        if(dataToSend.subCategory === '' || !('subCategory' in dataToSend) )
        {
            allowsendingData = false;
            setErrorMessage("Veuillez sélectionner un catégorie")
        }
        else if(dataToSend.subCategory !== 'Autre')
        {
            delete dataToSend.details.customCategory;
        }

        if(dataToSend.city === '' || !('city' in dataToSend))
        {
            allowsendingData = false;
            setErrorMessage("Veuillez sélectionner une ville")
            
        
        }

        if(imgHolder === "/media/imageHolder.png")
        {
            allowsendingData = false;
            
            setErrorMessage("Veuillez ajouter une image")
            
        }

        
        if(dataToSend.details.Designation === "")
        {
            allowsendingData = false;
         
            setErrorMessage("Veuillez entrer une designation")
            
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


    //adding drop location incase of offPerson choice
    function handleDropLocation(e)
    {
        
        setDropLocation(e.target.value);
        setData({...data,details:{...data.details,dropLocation}})

    }


    //adding contact info incase of onPerson choice
    function handleContacting(e)
    {
        // delete data.details.dropLocation;
        if(selectedOption === "onPerson" && e.target.name === 'phoneNumber')
        {
            setPhoneNumber(e.target.value);
            
        }

        if(selectedOption === "onPerson" && e.target.name === 'email')
        {
            setEmail(e.target.value)
            
        }
    }



    return <form id={styles.addFoundItemForm} onSubmit={HandleSubmit} >


       {errorMessage !== "" && <p className="alert alert-danger">{errorMessage}</p>}
       <div id={styles.addFoundItemContainer}>
            <div className="mainData">
                <div id={styles.ImageContainer} onClick={HandleImageClick} >
                    <label htmlFor="image">Image:</label>
                    <div id={styles.imageHolder}>
                        <img src={imgHolder} alt="" width='250px' height='250px' />
                    </div>
                    <input type="file" name="Image" id="image" ref={fileInputRef} style={{display:'none'}} onChange={handleUploadedImage} accept="image/*" />
                </div>

                <div className={styles.itemNameContainer}>
                    <label htmlFor="itemName">Designation</label>
                    <input className={styles.AddingObjectDetailsInputs} type="text" name="" id="itemName" onChange={(e) => setData({...data,details:{...data.details,Designation:e.target.value}}) } />
                </div>

                
                <CategoryDropDown setCategory = {setCategory} setCustomCategory = {setCustomCategory} />
                <CitiesSelect setCity = {setCity}/>
             
            </div>

            <div id={styles.LocationData} >
                <p id={styles.LocationTitle}>Où le propriétaire peut-il trouver cet objet</p>

                <div className={styles.LocationChoice}>
                    <div className={styles.radioContainer}>
                        <input className={styles.addFountItemRadio} type="radio" name="location" value="onPerson" id="onPerson"  checked={selectedOption === "onPerson"} onChange={(e) => handleCheckBox(e)}/>
                        <label htmlFor="onPerson"  >Chez moi</label>
                    </div>
                    <div id={styles.offPersonContainer}>
                        <div  className={styles.radioContainer}>
                            <input className={styles.addFountItemRadio} type="radio" name="location" id="" value="offPerson" checked={selectedOption === "offPerson"} onChange={(e) => handleCheckBox(e)} />
                            <input type="text" name="dropLocation" id="offPersonLocationInput" value={dropLocation}   disabled = {selectedOption !== "offPerson"} onChange={handleDropLocation}     />
                        </div>
                        <p id={styles.offPersonLocationMessage} >indiquez l'endroit où vous laisserez l'objet, par exemple un commissariat de police </p>
                    </div>

                    <div id={(selectedOption === "onPerson")?styles.OnPersonChosen:styles.onPersonNotChosen} >
                        <div className={styles.AddItemContact} >
                            <label htmlFor="tel">Telephone:</label>
                            <input type="text" name="phoneNumber" id={styles.tel} value={phoneNumber}   onChange={handleContacting} />
                        </div>

                        <div className={styles.AddItemContact} >
                            <label htmlFor="email">E-mail:</label>
                            <input type="text" name="email" id="email" value={email}   onChange={handleContacting} />
                            <p>Votre e-mail ne sera affiché qu'aux utilisateurs connectés</p>
                        </div>

                    </div>
                </div>

            </div>

       </div>

        <button className="ConfirmButtton">Confirmer</button>
    </form>
}