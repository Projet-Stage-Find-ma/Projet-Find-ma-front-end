import logo from './logo.svg';
import './App.css';
import {Routes,Route } from 'react-router-dom';
import Home from './Components/layout/home';
import Phone from './Components/phone';
import FoundList from './Components/I_found';
import LostList from './Components/I_lost';
import NavBar from './Components/layout/navbar';

function App() {
  return <>
    <NavBar></NavBar>
    
    <Routes>
      <Route path='/' element= {<Home />} ></Route>
      <Route path='/phone' element= {<Phone />} ></Route>
      <Route path='/found' element= {<FoundList />} ></Route>
      <Route path='/lost' element= {<LostList />} ></Route>
    </Routes>
  
  
  </>
}

export default App;
