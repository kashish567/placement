import React from 'react';
import './landing.css';
import { Link } from "react-router-dom";

function Land() {

  return (
    <div className="container">
      <nav>
        <div className="nav__logo">MEDIBuddy</div>
        <ul className="nav__links">
          <li className="link"><a href="#">Home</a></li>
          <li className="link"><a href="#">About Us</a></li>
          <li className="link"><a href="#">Contact</a></li>
        </ul>
        <Link to="/Login">  
          <button className="btn">LOGIN</button>
        </Link>

      </nav>
      <header className="header">
        <div className="content">
          <h1><span>Get Quick</span><br />Medical Services</h1>
          <p>
            In today's fast-paced world, access to prompt and efficient medical
            services is of paramount importance. Your family members and even the
            doctors can keep track of your health sitting on a place.
            MAKING THE THINGS EASIER.
          </p>
        </div>
        
      </header>
    </div>
  );
}

export default Land;
