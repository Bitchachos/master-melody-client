import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css"

function Navbar(){
    return (
        <nav className="Navbar">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/songs">Song List</NavLink>
            <NavLink to="#">Practice Rooms</NavLink>
            <NavLink to="#">Register</NavLink>
            <NavLink to="#">Login</NavLink>
        </nav>
    )
  }

export default Navbar;