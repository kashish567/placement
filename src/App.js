// import './App.css'
import Login from "./Login";
import Signup from "./Signup";
import Land from "./landing";
import Dash from "./dash";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/Signup" element={<Signup/>}/>
          <Route path="/" element={<Land/>}/>
          <Route path="/dash" element={<Dash/>}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;