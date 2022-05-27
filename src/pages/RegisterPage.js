import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../components/AddSong.css"
import "./LoginPage.css"
import { ThemeContext } from "../context/theme.context";


function RegisterPage(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState(undefined);

    const { theme } = useContext(ThemeContext);

    const navigate = useNavigate();

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        
        const requestBody = { email, password };

        axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, requestBody)
            .then((response) => {
                navigate('/login');
            })
            .catch((error) => {
                const errorDescription = error.response.data.myError;
                console.log("error creating account", errorDescription)
                setErrorMessage(errorDescription);
            })
    };


    return (
        <div className="LoginPage">
            <h1>Register</h1>

            <form className="forms" onSubmit={handleRegisterSubmit}>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={email}
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <br />
                <br />

                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    required={true}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br/>
                <br/>
                <button className={"button-52 " + theme} type="submit">Sign Up</button>
            </form>

            {errorMessage && <div className="zoom-in-zoom-out">{errorMessage}</div>}

            <p className="dark-pars"><b>Already have an account?</b></p>
            <Link className="loginLink" to={"/login"}><b>Log In</b></Link>
        </div>
    )
}

export default RegisterPage;
