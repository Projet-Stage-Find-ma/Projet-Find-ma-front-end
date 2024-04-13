import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'



import {Routes,Route } from 'react-router-dom';
import Home from './Components/layout/home';
import Phone from './Components/phone';
import FoundList from './Components/I_found';
import LostList from './Components/I_lost';
import NavBar from './Components/layout/navbar';
import UserLogin from './Components/UserConnection/UserLogin';
import UserSignUp from './Components/UserConnection/UserSignUp';
import Footer from './Components/layout/footer';
import UserProfile from './Components/UserProfil/UserProfile';
import UserPhones from './Components/UserProfil/UserPhones';
import UserObjects from './Components/UserProfil/UserObjects';
import NavBarLogged from './Components/layout/navbarLogged';
import Addphone from './Components/Addphone';

function App() {
  return <>
    <NavBar></NavBar>
    

    
    <Routes>
      <Route path='/' element= {<Home />} ></Route>
      <Route path='/phone' element= {<Phone />} ></Route>
      <Route path='/found' element= {<FoundList />} ></Route>
      <Route path='/lost' element= {<LostList />} ></Route>

      <Route path='/UserLogin' element= {<UserLogin />} ></Route>
      <Route path='/UserSignUp' element= {<UserSignUp />} ></Route>

      <Route path='/UserProfile' element={<UserProfile/>} ></Route>
      <Route path='/UserPhones' element= {<UserPhones/>} ></Route>
      <Route path='/UserObjects' element= {<UserObjects />} ></Route>
      <Route path='/addphone' element= {<Addphone />} ></Route>
      

    </Routes>

    <Footer></Footer>
  
  
  </>
}

export default App;
