
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



import Addphone from './Components/Addphone';
import  {jwtDecode}  from "jwt-decode";

import { useState,useEffect } from 'react';
import MainApp from './MainApp';

function App() {


  const [userID,setUserID] = useState();
  const [userIsLogged,setUserIsLogged] = useState(false);


  useEffect(() => {
    const fetchUserID = async () => {
        const token = await localStorage.getItem('token');
        if(token) {
            const decodedToken = jwtDecode(token);
            setUserID(decodedToken.userId);
        }
    };

    fetchUserID();
}, []);
 

  

  return <>
    
  
    
    <Routes>
      <Route path='*' element={<MainApp userID = {userID} />} ></Route>
      <Route path='/UserLogin' element= {<UserLogin   />} ></Route>
      <Route path='/UserSignUp' element= {<UserSignUp />} ></Route>
    </Routes>

   
  
  </>
}

export default App;
