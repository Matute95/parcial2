import "./App.css";
import { useEffect, useState } from "react";
import SignIn from "./SingIn";
import { auth } from "./firebase";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./SingUp";
import MiniDrawer from "./navbar";

export default function App() {
  const [user, setUser] = useState(null)
  useEffect(()=>{
    auth.onAuthStateChanged((fireUser) =>{
      if (fireUser){
        setUser(fireUser)
      }
    })
  },[])
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path="/" element={user?<MiniDrawer/>:<SignIn/>} />
        <Route path="/SingUp" element={<SignUp/>} />
      </Routes>
    </div>
    </BrowserRouter>
  )
}