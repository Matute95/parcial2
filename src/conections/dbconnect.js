import {createUserWithEmailAndPassword, 
  signInWithEmailAndPassword} from "firebase/auth"
  import {doc, setDoc, getDoc, getDocs, collection, addDoc, deleteDoc, updateDoc} from "firebase/firestore"
  import { auth, db } from "./firebase"
 
 export async function regUser(email, password, nombre, apellido, plan){
     const info = await createUserWithEmailAndPassword
     (auth, email, password).then((fireUser)=>{
       return fireUser
     })
     const docRef = doc(db,'usuario/'+info.user.uid)
     setDoc(docRef, {nombre: nombre, apellido: apellido, plan: plan})
 }

 export async function regProy(nombre, tipo){
  const user = auth.currentUser.uid
  const permisos = []
  tipo==="publico"?permisos.push("Proyecto Publico"):
  permisos.push(auth.currentUser.email)
  await addDoc(collection(db,'proyecto'), 
  {nombre: nombre, usuario: user, tipo: tipo, permisos: permisos})
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

 export async function editProy(id, nombre, tipo){
  const user = auth.currentUser.uid
  await setDoc(doc(db,'proyecto',id), 
  {nombre: nombre, usuario: user, tipo: tipo})
}

export async function deleteProy(id){
  await deleteDoc(doc(db,'proyecto',id))
}

export async function verificar(id){
  if (!auth.currentUser) {return true}
  const proy = await getDoc(doc(db,'proyecto',id))
  if(proy.data().tipo==="publico"){
    return true
  }else{
    var flag = false
    proy.data().permisos.forEach((item)=>{
      if(item===auth.currentUser.email){
        flag = true
        return true
      }
    })
    if (flag) {return true}
  }
  return false
}

export async function publico(id){
  const proy = await getDoc(doc(db,'proyecto',id))
  return proy.data().permisos
}

export async function addEmail(id, email){
  const proy = await getDoc(doc(db,'proyecto',id))
  const data = []
  proy.data().permisos.forEach((item)=>{
    data.push(item)
  })
  data.push(email)
  await updateDoc(doc(db,'proyecto',id),{permisos: data})
  return data
}

export async function quitarEmail(id, email){
  const proy = await getDoc(doc(db,'proyecto',id))
  const data = []
  proy.data().permisos.forEach((item)=>{
    if(item !== email){
      data.push(item)
    }
  })
  await updateDoc(doc(db,'proyecto',id),{permisos: data})
  return data
}