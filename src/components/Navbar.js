import React from 'react';
import {  NavLink } from 'react-router-dom'
import  './Navbar.css'

const Navbar = () => {


  return (
    <div className="navbar">
    <ul className="navigation">
      <NavLink className="navigation-link" to="/">HOME</NavLink>
      <NavLink className="navigation-link" to="/news">
        NEWS
      </NavLink>
      <NavLink className="navigation-link" to="https://github.com/manavsehgal/reactspeedcoding">
        <i className="fa fa-github"></i> Search
      </NavLink>
      <NavLink className="navigation-link" to="/blog">
        <i className="fa fa-comments"></i> Blog
      </NavLink>
    </ul>
    </div>
  );


}

export default Navbar;
