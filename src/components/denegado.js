import { LinearProgress } from "@mui/material"
import { useEffect, useState } from "react"
import { Navigate, useParams } from "react-router-dom"
import { verificar } from "../conections/dbconnect"

export default function Verificar(){
  const { id } = useParams()
  const [permiso, setPermiso] = useState("espera")
  useEffect(() => {
    async function first(){
        const flag = await verificar(id)
        console.log(flag)
        flag?setPermiso("si"):setPermiso("no")
    }
    first()
    // eslint-disable-next-line
  }, [])
    return permiso==="espera"?<LinearProgress/>:permiso==="si"?
    (<Navigate to={"/invitado/"+id}/>):(
    <div style={{textAlign:"center"}}>
    <h1>No tiene permisos para acceder al proyecto</h1>
    <h1>Contacte con el administrador del proyecto</h1>
 </div>)
 }