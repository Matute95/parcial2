import "./App.css";
import { useEffect, useState } from "react";
import SignIn from "./session/singIn";
import { auth } from "./conections/firebase";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Pricing from "./session/plans";
import MiniDrawer from "./components/navbar";
import Gracias from "./session/gracias";
import { getUsuario } from "./conections/dbconnect";
import Denegado from "./components/denegado";
import { LinearProgress } from "@mui/material";
import Verificar from "./components/denegado";

export default function App() {
  const [user, setUser] = useState(null)
  useEffect(()=>{
    auth.onAuthStateChanged((fireUser) =>{
      async function asyncrona(){
        if (fireUser){
          const usuario = await getUsuario()
          setUser(usuario)
        }else{
          setUser("login")
        }
      }
      asyncrona()
    })
  },[])
  const home = () => {
    if(user===null){
      return <LinearProgress/>
    }else{
      if (user==="login"){
        return <SignIn/>
      }else if(user.plan==="Registrarse Gratis"){
        return <Gracias/>
      }else{
        return <MiniDrawer/>
      }
    }
  }
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path="/" element={home()} />
        <Route path="/:id" element={<Verificar/>} />
        <Route path="/invitado/:id" element={<MiniDrawer/>} />
        <Route path="/plans" element={<Pricing/>} />
        <Route path="/denegado" element={<Denegado/>} />
      </Routes>
    </div>
    </BrowserRouter>
  )
}