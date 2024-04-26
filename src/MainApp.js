


import {Routes,Route } from 'react-router-dom';
import Home from './Components/layout/home';
import Phone from './Components/phone';
import ItemsSearchList from './Components/Items/ItemsSearchList';
import NavBar from './Components/layout/navbar';
import NavBarLogged from './Components/layout/navbarLogged';
import UserLogin from './Components/UserConnection/UserLogin';
import UserSignUp from './Components/UserConnection/UserSignUp';
import Footer from './Components/layout/footer';
import UserProfile from './Components/UserProfil/UserProfile';
import UserPhones from './Components/UserProfil/UserPhones';
import UserObjects from './Components/UserProfil/UserObjects';
import AddFoundItem from './Components/Items/AddItem/addFoundItem';
import AddLostItem from './Components/Items/AddItem/addLostItem';
import ItemDetails from './Components/Items/ItemDetails/itemDetails';
import ModifyPhone from './Components/Modifyphone';
import Buyphone from './Components/Buyphone';

import Addphone from './Components/Addphone';
import { useEffect, useState } from 'react';
import AddItem from './Components/Items/AddItem/addItem';
import VerifyIMEI from './Components/verifyIMEI';
import ModifyLostItem from './Components/UserProfil/modifyObject';


export default function MainApp(props)
{
    const [isUserLoggedIn,setIsUserLoggedIn] = useState(false);
    const [isLoading,setIsLoading] = useState(true);
    
    
    useEffect(() =>
  {
    const userIsLoggedIn = checkUserLoginStatus();
    setIsUserLoggedIn(userIsLoggedIn);
    setIsLoading(false);
  },[])

  const checkUserLoginStatus = () =>
  {
    const token = localStorage.getItem('token');
    return !!token;
  }

    if(isLoading)
    {
      return <h1>Loading...</h1>
    }
    else
    {
    return <>
    
 
    {(isUserLoggedIn)?<NavBarLogged></NavBarLogged>:<NavBar></NavBar>}
    

    <Routes>
      <Route path='/' element= {<Home/>} ></Route>
      <Route path='/phone' element= {<Phone />} ></Route>
      

      <Route path='/itemsList/:type' element= {<ItemsSearchList />} ></Route>
      <Route path='/item/:id' element={<ItemDetails/>}></Route>
      
      <Route path='/Buyphone' element={<Buyphone/>} ></Route>
      <Route path='/Modifyphone/:id' element={<ModifyPhone/>}></Route>
      <Route path='/UserProfile' element={<UserProfile/>} ></Route>
      <Route path='/UserPhones' element= {<UserPhones/>} ></Route>
      <Route path='/verifyIMEI' element={<VerifyIMEI/>} ></Route>

      <Route path='/UserObjects' element= {<UserObjects />} ></Route>
      <Route path='/addphone' element= {<Addphone />} ></Route>
      <Route path='/addObject/*' element={<AddItem/>}></Route>
      <Route path='/ModifyObject/:id' element = {<ModifyLostItem/>} />


    </Routes>
    <Footer></Footer>
    
    </>

}
}