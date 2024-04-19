
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'



import {Routes,Route } from 'react-router-dom';
import Home from './Components/layout/home';
import Phone from './Components/phone';
import ItemsSearchList from './Components/Items/ItemsSearchList';
import NavBar from './Components/layout/navbar';
import UserLogin from './Components/UserConnection/UserLogin';
import UserSignUp from './Components/UserConnection/UserSignUp';
import Footer from './Components/layout/footer';
import UserProfile from './Components/UserProfil/UserProfile';
import UserPhones from './Components/UserProfil/UserPhones';
import UserObjects from './Components/UserProfil/UserObjects';
import NavBarLogged from './Components/layout/navbarLogged';
import axios from 'axios';
import { useEffect, useState } from 'react';

import ItemDetails from './Components/Items/itemDetails';

import Addphone from './Components/Addphone';
import Acceuil from './Components/layout/home';
import ModifyPhone from './Components/Modifyphone';
import Buyphone from './Components/Buyphone';


function App() {
  const [islogged,setIslogged]=useState(false)
  
  
  return <>
  
   {islogged?<NavBarLogged/>: <NavBar/>} 
   
   
 
    

    
    <Routes>
      <Route path='/home' element= {<Acceuil />} ></Route>
      <Route path='/phone' element= {<Phone />} ></Route>
     
      <Route path='/itemsList/:type' element= {<ItemsSearchList />} ></Route>
      <Route path='/item/:id' element={<ItemDetails/>}></Route>

      <Route path='/UserLogin' element= {<UserLogin />} ></Route>
      <Route path='/UserSignUp' element= {<UserSignUp />} ></Route>

      <Route path='/UserProfile' element={<UserProfile/>} ></Route>
      <Route path='/UserPhones' element= {<UserPhones/>} ></Route>
      <Route path='/UserObjects' element= {<UserObjects />} ></Route>
      <Route path='/addphone' element= {<Addphone />} ></Route>
      <Route path='/Modifyphone/:id' element= {<ModifyPhone />} ></Route>
      <Route path='/Buyphone' element= {<Buyphone />} ></Route>
      
     
      

    </Routes>

    <Footer></Footer>
  
  
  </>
}

export default App;
