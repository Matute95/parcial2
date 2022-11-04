    import {createUserWithEmailAndPassword, 
    signInWithEmailAndPassword} from "firebase/auth"
    import {doc, setDoc, getDoc, getDocs, collection, addDoc} from "firebase/firestore"
    import { auth, db } from "./firebase"
   
   export async function regUser(email, password, nombre, apellido, plan){
       const info = await createUserWithEmailAndPassword
       (auth, email, password).then((fireUser)=>{
         return fireUser
       })
       const docRef = doc(db,'usuario/'+info.user.uid)
       setDoc(docRef, {nombre: nombre, apellido: apellido, plan: plan})
   }

   export async function regProy(nombre){
    const user = auth.currentUser.uid
    const a = await addDoc(collection(db,'proyecto'), 
    {nombre: nombre, usuario: user})
    console.log(a)
}
   
   export async function Login(email, password){
     await signInWithEmailAndPassword(auth, email, password)
   }
   
   export async function getUsuario(){
     const uid=auth.currentUser.uid
     const docRef = doc(db,'usuario/'+uid)
     const datos = await getDoc(docRef)
     return datos.data()
   }

   export async function get(dir){
    const snaps = await getDocs(collection(db,dir))
    const coleccion = []
    snaps.forEach((snap)=>{
      coleccion.push({...snap.data(), id:snap.id}) 
    })
    return coleccion
   }

   export async function getProyectos(){
    const items = await get("proyecto")
    const data = []
    items.forEach((item)=>{
      if(item.usuario===auth.currentUser.uid){
        data.push(item)
      }
    })
    return data
   }