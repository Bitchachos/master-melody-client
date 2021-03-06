import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../components/AddSong.css"
import "./LoginPage.css"
import {AuthContext} from "../context/auth.context"
import { ThemeContext } from "../context/theme.context";

function LoginPage(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();

    const { theme } = useContext(ThemeContext);

    const { storeToken, authenticateUser } = useContext(AuthContext);


    const handleLoginSubmit = (e) => {
        e.preventDefault();

        const requestBody = { email, password };

        axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, requestBody)
            .then((response) => {
                // login successful
                
                const jwt = response.data.authToken;
                // console.log('Login was sucessful. JWT token: ', jwt);
                
                storeToken(jwt);
                authenticateUser();

                navigate('/');
            })
            .catch((error) => {
                // login failed
                const errorDescription = error.response.data.myError;
                console.log("error loggin in...", errorDescription)
                setErrorMessage(errorDescription);
            })
    };

    return (
        <div className="LoginPage">
            <h1>Log in</h1>

            <form className="forms" onSubmit={handleLoginSubmit}>
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
                <button className="button-52" type="submit">Login</button>
            </form>

            {errorMessage && <div className="zoom-in-zoom-out">{errorMessage}</div>}

            <p className="dark-pars"><b>Don't have an account yet?</b></p>
            <Link className={"loginLink " + theme} to={"/signup"}>Sign Up</Link>

        </div>
    )
}

export default LoginPage;
