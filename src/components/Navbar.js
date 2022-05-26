import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { ThemeContext } from "../context/theme.context";
import "./Navbar.css";

function Navbar(){

    const { theme } = useContext(ThemeContext);

    const {isLoggedIn, user, logOutUser} = useContext(AuthContext);

    return (
        <nav className={"Navbar " + theme }>
            <NavLink to="/" className="underline-animation">Home</NavLink>
            <NavLink to="/songs" className="underline-animation">Song List</NavLink>
            <NavLink to="/rehearsals" className="underline-animation">Practice Rooms</NavLink>

            { isLoggedIn &&
                <>
                    <span className="welcome">Welcome, {user.email} </span>
                    <button className="underline-animation logout-dark" onClick={logOutUser}>Log Out</button>
                </>
            }

            { !isLoggedIn &&
                <>
                    <NavLink to="/signup" className="underline-animation">Register</NavLink>
                    <NavLink to="/login" className="underline-animation">Log In</NavLink>
                </>
            }
        </nav>
    )
  }

export default Navbar;