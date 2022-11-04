import "./App.css";
import { useEffect, useState } from "react";
import SignIn from "./session/singIn";
import { auth } from "./conections/firebase";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Pricing from "./session/plans";
import MiniDrawer from "./components/navbar";

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
        <Route path="/:id" element={<MiniDrawer/>} />
        <Route path="/plans" element={<Pricing/>} />
      </Routes>
    </div>
    </BrowserRouter>
  )
}