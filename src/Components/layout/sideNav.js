import React from 'react';
import { Link } from 'react-router-dom';
import "./sideNav.css"
const SideNavBar = () => {
  return (
    <div className="relative-container1">
      <div className="sidenav" >
        <Link to="/UserProfile" className="nav-link">Profil</Link>
        <Link to="/UserObjects" className="nav-link">User Objects</Link>
        <Link to="/UserPhones" className="nav-link">User Phones</Link>
      </div>
    </div>
  );
};

export default SideNavBar;
