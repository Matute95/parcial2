import { Button } from "@mui/material"
import { auth } from "../conections/firebase"

export default function Gracias(){
    const out = async() => {
        await auth.signOut()
        window.location.reload()
      }
   return <div style={{textAlign:"center"}}>
            <h1>Tiene una cuenta registrada con el correo "{auth.currentUser.email}"</h1>
            <h1>Use este correo para ser agregado a proyectos privados</h1>
            <Button onClick={out}>Volver</Button>
         </div>
}
