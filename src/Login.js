import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

import './Login.css';


function Login() {

    const history = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function submit(e) {
        e.preventDefault();
    
        try {
            const res = await axios.post("http://localhost:8000/", { email, password });
    
            if (res.data === "exist" && email.endsWith("vcet.edu.in")) {
                console.log(email);
                history('/admin');
            } else if (res.data === "exist") {
                console.log(email);
                history('/dash');
            } else if (res.data === "notexist") {
                alert("User has not signed up");
            }
        } catch (error) {
            console.error("Error occurred:", error);
            alert("Failed to login. Please try again.");
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