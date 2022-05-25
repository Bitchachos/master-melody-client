import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "./Navbar.css"

function Navbar(){

    const {isLoggedIn, user, logOutUser} = useContext(AuthContext);

    return (
        <nav className="Navbar">
            <NavLink to="/" className="underline-animation">Home</NavLink>
            <NavLink to="/songs" className="underline-animation">Song List</NavLink>
            <NavLink to="/rehearsals" className="underline-animation">Practice Rooms</NavLink>

            { isLoggedIn &&
                <>
                    <span className="welcome">Welcome, {user.email} </span> 
                    {/* <NavLink activeKey="/" className="underline-animation" onSelect={logOutUser}>Log Out</NavLink> */}
                    <button className="underline-animation" onClick={logOutUser}>Log Out</button>
                </>
            }

            { !isLoggedIn &&
                <>
                    <NavLink to="/signup" className="underline-animation">Register</NavLink>
                    <NavLink to="/login" className="underline-animation">Log in</NavLink>
                </>
            }
        </nav>
    )
  }

export default Navbar;