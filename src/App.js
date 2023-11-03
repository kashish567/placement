// import './App.css'
import Login from "./Login";
import Signup from "./Signup";


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/Signup" element={<Signup/>}/>


        </Routes>
      </Router>
    </div>
  );
}

export default App;