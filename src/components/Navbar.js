import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css"

function Navbar(){
    return (
        <nav className="Navbar">
            <NavLink to="/" className="underline-animation">Home</NavLink>
            <NavLink to="/songs" className="underline-animation">Song List</NavLink>
            <NavLink to="#" className="underline-animation">Practice Rooms</NavLink>
            <NavLink to="#" className="underline-animation">Register</NavLink>
            <NavLink to="#" className="underline-animation">Login</NavLink>
        </nav>
    )
  }

export default Navbar;