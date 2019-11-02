import React from 'react';
import {  NavLink } from 'react-router-dom'
import  './Navbar.css';


const Navbar = () => {


  return (
    <div className="navbar">
    <ul className="navigation">
      <NavLink className="navigation-link" to="/">HOME</NavLink>
      <NavLink className="navigation-link" to="/news">
        NEWS
      </NavLink>
      <NavLink className="navigation-link" to="/fixtures">
        FIXTURES
      </NavLink>
     
    </ul>
    </div>
  );


}

export default Navbar;
