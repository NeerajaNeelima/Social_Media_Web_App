import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// main.js or main.ts
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './Components/Auth/SignUp'
import SignIn from './Components/Auth/SignIn'
import Home from './Components/Pages/Home'

import './App.css'
function App() {
  
  return (
    
    <Router>
      <Routes>
        <Route index element={<SignUp/>}/>
        <Route path="/singin" element={<SignIn/>}/>
        <Route path="/home" element={<Home/>}/>
      </Routes>
      
    </Router>
    
    
  )
}

export default App
