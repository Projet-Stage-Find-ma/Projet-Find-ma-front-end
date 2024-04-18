import { useState,useRef } from "react";
import SelectCategory from "./subComponents/selectCategory";
import SelectCities from "./subComponents/selectCity";
import SelectSubCategory from "./subComponents/selectSubCategory";
import imageCompression from "browser-image-compression";


import './addFoundItem.css'
import axios from "axios";



export default function AddFoundItem()
{

    const [selectedOption, setSelectedOption] = useState('onPerson');
    const [imgHolder,setImgHolder] = useState('/media/imageHolder.png')
    const fileInputRef = useRef(null);

    const [data,setData] = useState({details:{objectLocation:"onPerson"}});

    const [errorMessage,setErrorMessage] = useState("");

    const [phoneNumber,setPhoneNumber] = useState('');
    const [email,setEmail] = useState('');
    const [dropLocation,setDropLocation] = useState('');

    const [selectedCategory,setSelectedCategory] = useState('');
    





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
            console.log(dropLocation);
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
            console.log("category Validation")
        }

        if(dataToSend.subCategory === '' || !('subCategory' in dataToSend))
        {
            allowsendingData = false;
            console.log("subCategory validation")
        }

        if(dataToSend.city === '' || !('city' in dataToSend))
        {
            allowsendingData = false;
            console.log("city validation")
        }

        if(imgHolder === "/media/imageHolder.png")
        {
            allowsendingData = false;
            console.log("Image validation")
        }

        if(allowsendingData)
        {

            

            axios.post(`http://localhost:3002/api/data/createFoundObject`,dataToSend,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            })
            .then(res => console.log(res.data))
            .catch(err => console.error(err))
        }
        
        
        



    }

    //adding categories
    function setCategory(x)
    {
        delete data.subCategory;
        setData({...data,category:x})
        setSelectedCategory(x);
    }

    function setSubCategory(x)
    {
        setData({...data,subCategory:x})
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
            // setData({...data,details:{...data.details,phoneNumber}})
        }

        if(selectedOption === "onPerson" && e.target.name === 'email')
        {
            setEmail(e.target.value)
            // setData({...data,details:{...data.details,email}})
        }
    }



    return <form id="addFoundItemForm" onSubmit={HandleSubmit} >


        <p>{errorMessage}</p>
       <div id="addFoundItemContainer">
            <div className="mainData">
                <div id="ImageContainer" onClick={HandleImageClick} >
                    <label htmlFor="image">Image:<span className="obligationStar">*</span></label>
                    <div id="imageHolder">
                        <img src={imgHolder} alt="" width='250px' height='250px' />
                    </div>
                    <input type="file" name="Image" id="image" ref={fileInputRef} style={{display:'none'}} onChange={handleUploadedImage} accept="image/*" />
                </div>

                <SelectCategory setCategory = {setCategory}></SelectCategory> 
                <SelectSubCategory setSubCategory = {setSubCategory} selectedCategory = {selectedCategory} />
                <SelectCities setCity = {setCity} />
            </div>

            <div id="LocationData" >
                <p id="LocationTitle">Où le propriétaire peut-il trouver cet objet</p>

                <div className="LocationChoice">
                    <div className="radioContainer">
                        <input className="addFountItemRadio" type="radio" name="location" value="onPerson" id="onPerson"  checked={selectedOption === "onPerson"} onChange={(e) => handleCheckBox(e)}/>
                        <label htmlFor="onPerson"  >Chez moi</label>
                    </div>
                    <div id="offPersonContainer">
                        <div  className="radioContainer">
                            <input className="addFountItemRadio" type="radio" name="location" id="" value="offPerson" checked={selectedOption === "offPerson"} onChange={(e) => handleCheckBox(e)} />
                            <input type="text" name="dropLocation" id="offPersonLocationInput" value={dropLocation}   disabled = {selectedOption !== "offPerson"} onChange={handleDropLocation}     />
                        </div>
                        <p id="offPersonLocationMessage" >indiquez l'endroit où vous laisserez l'objet, par exemple un commissariat de police <span className="obligationStar">*</span></p>
                    </div>

                    <div id={(selectedOption === "onPerson")?"OnPersonChosen":"onPersonNotChosen"} >
                        <div className="AddItemContact" >
                            <label htmlFor="tel">Telephone:<span className="obligationStar">*</span></label>
                            <input type="text" name="phoneNumber" id="tel" value={phoneNumber}   onChange={handleContacting} />
                        </div>

                        <div className="AddItemContact" >
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