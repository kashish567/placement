import React from 'react'
import { useNavigate, Link } from "react-router-dom"
import Login from './Login';


function Dash(){
return (
    <div className="login">

        <h1>hello</h1>

       

        <Link to="/Login">Login page</Link>

    </div>
)
}

export default Dash;
