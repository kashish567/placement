import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import Dash from "./dash";
import './Login.css';
const end = "gmail.com";


function Login() {

    const history = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function submit(e) {
        e.preventDefault();

        try {
            await axios.post("http://localhost:8000/", {
                email, password
            })
            .then(res => {
                if (res.data === "exist" && email.endsWith(end)) {
                    console.log(email);

                } else if (res.data === "exist" && email.endsWith(end)){
                    // Handle other cases
                } else if (res.data === "notexist") {
                    alert("User has not signed up");
                }
            })
            .catch(e => {
                alert("Wrong details");
                console.log(e);
            });

        } catch (e) {
            console.log(e);
        }
    }


    return (
        <div className="login">

            <h1>Login</h1>

            <form action="POST">
                <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" />
                <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" />
                <input type="submit" onClick={submit} />

            </form>

            <br />
            <p>Not an existing user?</p>
            <br />

            <Link to="/signup">Signup Page</Link>

        </div>
    )
}

export default Login;