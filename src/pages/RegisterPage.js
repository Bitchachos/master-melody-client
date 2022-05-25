import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../components/AddSong.css"


function RegisterPage(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        
        const requestBody = { email, password };

        axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, requestBody)
            .then((response) => {
                navigate('/login');
            })
            .catch((error) => {
                // const errorDescription = error.response.data.message;
                // console.log("error creating account", errorDescription)
                // setErrorMessage(errorDescription);
            })
    };


    return (
        <div>
            <h1>Register</h1>

            {/* {errorMessage && <p className="error-message">{errorMessage}</p>} */}

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
                <button className="button-52" type="submit">Sign Up</button>
            </form>

            <p><b>Already have an account?</b></p>
            <Link className="loginLink" to={"/login"}><b>Login</b></Link>
        </div>
    )
}

export default RegisterPage;
