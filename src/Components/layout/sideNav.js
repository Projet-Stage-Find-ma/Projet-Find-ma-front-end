import React from 'react';
import { Link } from 'react-router-dom';
import "./sideNav.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faCartFlatbedSuitcase,faMobile,faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
const SideNavBar = () => {
  const navigate=useNavigate();
  function Handlelogout()
    {
        localStorage.removeItem('token');
        navigate('/userLogin')
    }
  return (
    <div className="relative-container1">
      <div className="sidenav" >
        <Link to="/UserProfile" className="nav-link"><FontAwesomeIcon icon={faAddressCard} className='myicon'/>Profil</Link>
        <Link to="/UserObjects" className="nav-link"><FontAwesomeIcon icon={faCartFlatbedSuitcase}className='myicon' />Mes Objets</Link>
        <Link to="/UserPhones" className="nav-link"><FontAwesomeIcon icon={faMobile} className='myicon'/>Mes Téléphones</Link>
        <button className="nav-linkMYButton" onClick={Handlelogout}><FontAwesomeIcon icon={faArrowRightFromBracket} className='myicon' style={{"marginLeft":"15px"}}/>Se déconnecter</button>

      </div>
    </div>
  );
};

export default SideNavBar;
