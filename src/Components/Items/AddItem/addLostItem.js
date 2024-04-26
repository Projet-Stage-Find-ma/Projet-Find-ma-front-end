import { useState,useRef } from "react";



import imageCompression from "browser-image-compression";
import { useNavigate } from "react-router-dom";

import styles from './addLostItem.module.css'

import axios from "axios";
import CategoryDropDown from "../../subComponents/categorySelect";
import CitiesSelect from "../../subComponents/citiesSelect";


import LostAnimalDetails from "./AddItemSubComponents/lostAnimalDetails";
import LostPhoneDetails from "./AddItemSubComponents/lostPhoneDetails";

export default function AddLostItem()
{

  
    const [imgHolder,setImgHolder] = useState('/media/imageHolder.png')
    const fileInputRef = useRef(null);

    const [data,setData] = useState({category:"",subCategory:"",details:{Designation:"",Endroit:"",Description:""},type:"lost"});

    const [errorMessage,setErrorMessage] = useState("");

    const [phoneNumber,setPhoneNumber] = useState('');
    const [email,setEmail] = useState('');
    
   
    
    
    const navigate = useNavigate();




   
  


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

    
    //adding contact info 
    function handleContacting(e)
    {
        
        if(e.target.name === 'phoneNumber')
        {
            setPhoneNumber(e.target.value);
        }

        if(e.target.name === 'email')
        {
            setEmail(e.target.value)  
        }
    }

    function HandleSubmit(event)
    {
        let dataToSend = data;
        let allowsendingData = true;
        
        event.preventDefault();
        
       
      
            
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
              dataToSend = {...dataToSend,details:{...dataToSend.details,email}};
            allowsendingData = true;
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

       

         
        if(dataToSend.category === "Animal" && dataToSend.subCategory === "Autre")
        {
          if(dataToSend.details.animalName === "" || !('animalName' in dataToSend.details)  )
          {
            allowsendingData = false;
            setErrorMessage("Vous devez saisir le nom de l'animal")
          }

          if(dataToSend.details.animalColor === "" || !('animalColor' in dataToSend.details)  )
          {
            allowsendingData = false;
            setErrorMessage("Vous devez saisir la couleur de l'animal")
          }
        }
        else
        {
          delete dataToSend.details.animalName;
          delete dataToSend.details.animalRace;
          delete dataToSend.details.animalColor;
   
        }
        

        if(dataToSend.category === "Electronique" && dataToSend.subCategory === "Telephone")
        {
          if(dataToSend.details.model === "" || !('model' in dataToSend.details)  )
          {
            allowsendingData = false;
            setErrorMessage("Vous devez choisir le model de votre telephone")
          }
        }
        else
        {
          delete dataToSend.details.marque;
          delete dataToSend.details.model;
          delete dataToSend.details.serialNumber;
          delete dataToSend.details.imei;
          delete dataToSend.details.phoneColor;
        }

        if(dataToSend.details.Description === "" )
        {
            allowsendingData = false;
            setErrorMessage("Veuillez entrer un description")
        }

        if(dataToSend.city === '' || !('city' in dataToSend))
        {
            allowsendingData = false;
       
            setErrorMessage("Veuillez sélectionner une ville")
        
        }

       
        if(dataToSend.details.Endroit === "" )
        {
            allowsendingData = false;
            setErrorMessage("Veuillez entrer un Endroit")
        }

        
        if(dataToSend.details.Designation === "")
        {
          allowsendingData = false;
          setErrorMessage("Veuillez entrer une designation")
        }

        if(imgHolder === "/media/imageHolder.png")
        {
          allowsendingData = false;
          setErrorMessage("Veuillez ajouter une Image")
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
            .then(() =>  navigate('/itemsList/lost'))
            .catch(err => console.error(err))
           
            
            
           
            
        }
        
        
   
        



    }


    //adding categories
    function setCategory(x)
    {
        
      setData({...data,category:x.category,subCategory:x.subCategory})
   
    }

    function setImei(x)
    {
      setData({...data,details:{...data.details,imei:x}})
      
    }

    function setSerialNumber(x)
    {
      setData({...data,details:{...data.details,serialNumber:x}})
      
    }
    function setModel(x)
    { 
      setData({...data,details:{...data.details,marque:x.Marque,model:x.Model}})
    }

    function setPhoneColor(x)
    {
      setData({...data,details:{...data.details,phoneColor:x}})
    }

    function setAnimal(x)
    {
    
      
      if(x.key === 'Nom')
      setData({...data,details:{...data.details,animalName:x.value}})

      if(x.key === 'Race')
      setData({...data,details:{...data.details,animalRace:x.value}})

      if(x.key === 'Couleur')
      setData({...data,details:{...data.details,animalColor:x.value}})
     
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


      {errorMessage !== "" && <p className="alert alert-danger text-center">{errorMessage}</p>}
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
                    <input className={styles.dataInputs}  type="text" name="" id="itemName"onChange={(e) => setData({...data,details:{...data.details,Designation:e.target.value}}) } />
                </div>

                <div className="lostItemLocationContainer">
                    <label htmlFor="lostItemLocation">Endroit:</label>
                    <input className={styles.dataInputs}  type="text" name="" id="lostItemLocation"  onChange={(e) => setData({...data,details:{...data.details,Endroit:e.target.value}}) } placeholder="Où avez-vous perdu l'objet" />
                </div>

                <CitiesSelect setCity = {setCity}/>

                <div id={styles.itemLosingDescirptionContainer}>
                  <label htmlFor="">Desription:</label>
                  <textarea className={styles.dataInputs}  onChange= {e => setData({...data,details:{...data.details,Description:e.target.value}})} name="" id="" cols="30" rows="10" placeholder="Vous pouvez écrire plus de détails sur l'objet que vous avez perdu pour aider à l'identifier"></textarea>
                </div>

            
            </div>

            <div className={styles.secondaryContainer}>
              <div className={styles.lostItemCategorySelectionContainer}>
                <CategoryDropDown setCategory = {setCategory} setCustomCategory = {setCustomCategory} calledInLostItem = {true} />
                {(data.category === 'Animal' && data.subCategory === 'Autre')&&<LostAnimalDetails setAnimal = {setAnimal} />}
                {(data.category === 'Electronique' && data.subCategory === 'Telephone')&&<LostPhoneDetails setModel = {setModel} setPhoneColor={setPhoneColor} setImei = {setImei} setSerialNumber = {setSerialNumber}/>}
              </div>

              <div className={styles.lostItemContact}>
                  <div className={styles.AddItemContact} >
                      <label htmlFor="tel">Telephone:</label>
                      <input type="text" name="phoneNumber" id={styles.tel} value={phoneNumber}   onChange={handleContacting} />
                  </div>

                  <div className={styles.AddItemContact} >
                      <label htmlFor="email">E-mail:</label>
                      <input type="text" name="email" id="email" value={email}   onChange={handleContacting} />
                      <p>Votre e-mail ne sera affiché pas aux utilisateurs</p>
                </div>

              </div>
            </div>
             
            </div>

       

        <button className="ConfirmButtton">Confirmer</button>
    </form>
}