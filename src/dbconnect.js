    import {createUserWithEmailAndPassword, 
    signInWithEmailAndPassword} from "firebase/auth"
    import {doc, setDoc, getDoc} from "firebase/firestore"
    import { auth, db } from "./firebase"
   
   export async function regUser(email, password, nombre, apellido){
       const info = await createUserWithEmailAndPassword
       (auth, email, password).then((fireUser)=>{
         return fireUser
       })
       const docRef = doc(db,'usuario/'+info.user.uid)
       setDoc(docRef, {nombre: nombre, apellido: apellido})
   }
   
   export async function Login(email, password){
     await signInWithEmailAndPassword(auth, email, password)
   }
   
   export async function getUsuario(){
     const uid=auth.currentUser.uid
     const docRef = doc(db,'usuario/'+uid)
     const datos = await getDoc(docRef)
     console.log(datos.data(), uid)
     return datos.data()
   }