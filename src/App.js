// import './App.css'
import Login from "./Login";
import Signup from "./Signup";
import Land from "./landing";
import Dash from "./dash";
import AdminPanel from "./admin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CompanyJobRolesPage from "./dash";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/Signup" element={<Signup/>}/>
          <Route path="/" element={<Land/>}/>
          
          <Route path="/dash" element={<CompanyJobRolesPage/>}/>
          <Route path="/admin" element={<AdminPanel/>}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;