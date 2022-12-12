import { useState } from "react"
import { useMap, useMyPresence, useOthers, useHistory } from "../conections/liveblocks.config"
import List from '@mui/material/List'
import { Abc, Add, ArrowRightAlt, Delete, Fullscreen, Link, Redo, Remove, RotateLeft, RotateRight, Undo } from "@mui/icons-material"
import Drawer from "@mui/material/Drawer"
import { Box, Button, Fab, FormHelperText, IconButton, ListItem, Modal, TextField, Tooltip, Typography } from "@mui/material"
import { Objeto } from "./items"
import { addEmail, publico, quitarEmail } from "../conections/dbconnect"

//const COLORS = ["#DC2626", "#D97706", "#059669", "#7C3AED", "#DB2777"]
const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor:'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

async function lista(id){
  room = id
  correos = await publico(id)
}

var room = ""
var h = 100
var w = 130
var correos = []

export default function Board(item){
    const shapes = useMap("shapes")
    if (shapes == null) {
        return <div className="loading">Cargando...</div>
    }
    lista(item.room)
    return <Canvas shapes={shapes}/>
}

function Canvas({ shapes }) {
    const [isDragging, setIsDragging] = useState(false);
    const [{ selectedShape }, setPresence] = useMyPresence();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    const [open2, setOpen2] = useState(false);
    const handleOpen2 = () => setOpen2(!open2);
    const others = useOthers();
    const history = useHistory();
    const handleSubmit = async(event) => {
      event.preventDefault()
      const data = new FormData(event.currentTarget)
      correos = await addEmail(room, data.get('Email'))
      handleOpen2()
    };
    const insertItem = (ref) => {
      const shapeId = Date.now().toString();
      const item = {
        x: 50+getRandomInt(300),
        y: 50+getRandomInt(300),
        url: ref,
        text: "Descripcion",
        height: h,
        width: w,
        sentido: 0
      };
      shapes.set(shapeId, item);
    };
    const onShapePointerDown = (e, shapeId) => {
      history.pause();
      e.stopPropagation();
      setPresence({ selectedShape: shapeId }, { addToHistory: true });
      setIsDragging(true);
    };
    const deleteItem = () => {
      shapes.delete(selectedShape);
      setPresence({ selectedShape: null })
    };
    const onCanvasPointerUp = (e) => {
      if (!isDragging) {
        setPresence({ selectedShape: null }, { addToHistory: true });
      }
      setIsDragging(false)
      history.resume();
    };
    const onCanvasPointerMove = (e) => {
      e.preventDefault()
      if (isDragging) {
        const shape = shapes.get(selectedShape)
        if (shape) {
          shapes.set(selectedShape, {
            ...shape,
            x: e.clientX - 150,
            y: e.clientY - 100,
          });
        }
      }
    };
    const changeText = (t) => {
      const shape = shapes.get(selectedShape)
      if (shape) {
        shapes.set(selectedShape, {
          ...shape,
          text: t
        });
      }
    }
    const mas = () => {
      h=h+20
      w=w+20
      resize()
    }
    const menos = () => {
      h=h-20
      w=w-20
      resize()
    }
    const resize = () => {
      const shape = shapes.get(selectedShape)
      if (shape) {
        shapes.set(selectedShape, {
          ...shape,
          height: h,
          width: w
        });
      }
    }
    const rotar = () => {
      const shape = shapes.get(selectedShape)
      if (shape) {
        shapes.set(selectedShape, {
          ...shape,
          sentido: shape.sentido+90
        });
      }
    }
    const desrotar = () => {
      const shape = shapes.get(selectedShape)
      if (shape) {
        shapes.set(selectedShape, {
          ...shape,
          sentido: shape.sentido-90
        });
      }
    }
    const quitar = async(email) => {
      correos = await quitarEmail(room, email)
      handleOpen()
    }
    const persona = "https://firebasestorage.googleapis.com/v0/b/segundo-parcial-111e9.appspot.com/o/5.png?alt=media&token=e91e4ebd-04b1-4bf6-a698-7bb24f243d96"
    const objeto = "https://firebasestorage.googleapis.com/v0/b/segundo-parcial-111e9.appspot.com/o/1.png?alt=media&token=791d3067-d955-4f3b-a92b-8194d0f925b9"
    const db = "https://firebasestorage.googleapis.com/v0/b/segundo-parcial-111e9.appspot.com/o/2.png?alt=media&token=f752991f-d546-4a39-81b2-fb8cd62eb979"
    const app = "https://firebasestorage.googleapis.com/v0/b/segundo-parcial-111e9.appspot.com/o/3.png?alt=media&token=78ee0763-3c3b-4a41-bbc2-1dbd2e75cb88"
    const navegador = "https://firebasestorage.googleapis.com/v0/b/segundo-parcial-111e9.appspot.com/o/4.png?alt=media&token=5be8a78e-50e7-46e4-a2c8-ab631eb1e9c1"
    const sistema = "https://firebasestorage.googleapis.com/v0/b/segundo-parcial-111e9.appspot.com/o/6.png?alt=media&token=738e838a-ee81-4395-bf5a-23e62ad3f3d9"
    const relacion = "https://firebasestorage.googleapis.com/v0/b/segundo-parcial-111e9.appspot.com/o/7.png?alt=media&token=00d725c8-d5ea-49d5-9809-444c4ea7368a"
    const herramientas = [
      {icon: <Undo/>, function: history.undo, title: "Deshacer", insert:false},
      {icon: <Redo/>, function: history.redo, title: "Rehacer", insert:false},
      {icon: <Delete/>, function: deleteItem, title: "Eliminar", insert:false},
      {icon: <Add/>, function: mas, title: "Agrandar", insert:false},
      {icon: <Remove/>, function: menos, title: "Reducir", insert:false},
      {icon: <RotateRight/>, function: rotar, title: "rotar izquierda", insert:false},
      {icon: <RotateLeft/>, function: desrotar, title: "rotar derecha", insert:false},]
    const elementos = [
      {icon: <Link/>, function: handleOpen, title: "Invitar", insert:false},
      {icon: <Fullscreen/>, title: "Contenedor", insert:true, ref:"contenedor"},
      {icon: <Abc/>, title: "Texto", insert:true, ref:"texto"},
      {icon: <ArrowRightAlt/>, title: "Relacion", insert:true, ref:relacion},
      {icon: <img src={persona} alt="img"/>, title: "Persona", insert:true, ref:persona},
      {icon: <img src={objeto} alt="img"/>,  title: "Componente", insert:true, ref:objeto},
      {icon: <img src={db} alt="img"/>, title: "Base de Datos", insert:true, ref:db},
      {icon: <img src={app} alt="img"/>, title: "App Mobil", insert:true, ref:app},
      {icon: <img src={navegador} alt="img"/>, title: "Navegador", insert:true, ref:navegador},
      {icon: <img src={sistema} alt="img"/>, title: "Sistema", insert:true, ref:sistema}
    ]
    return (
      <div id="descargar">
        <div className="canvas" 
        style={{width:`calc(100% - ${90}px)`, marginLeft:"90px", marginTop:"65px"}}
        onPointerMove={onCanvasPointerMove}
        onPointerUp={onCanvasPointerUp}>
          {Array.from(shapes, ([shapeId, shape]) => {
            let selectionColor =
            selectedShape === shapeId
              ? "blue"
              : others
                  .toArray()
                  .some((user) => user.presence?.selectedShape === shapeId)
              ? "green"
              : undefined;
              return (
                  <Objeto
                  key={shapeId}
                  shape={shape}
                  id={shapeId}
                  onShapePointerDown={onShapePointerDown}
                  selectionColor={selectionColor}
                  changeText={changeText}/>
              );
          })}
        </div>
        <Box sx={{position:"fixed" ,top:"90%", left:"25%" }}>
          {herramientas.map((item)=>(
            <Tooltip title={item.title}>
            <Fab color="primary" aria-label="add" sx={{mr:1}} onClick={ item.function }>
              {item.icon}
            </Fab>
            </Tooltip>
          ))}
          </Box>
        <div>
        <Drawer variant="permanent" anchor="left" sx={{
          width: 90,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 90,
            boxSizing: 'border-box',
          },
        }}>
        <List>
          {elementos.map((item)=>(
             <ListItem disablePadding sx={{ display: 'block'}}>
             <IconButton onClick={ item.insert?()=>insertItem(item.ref):item.function }
              sx={{minHeight: 35, height:35, mt:1.5, ml:2.5}}>
             {item.icon}
            </IconButton>
            <FormHelperText sx={{textAlign: 'center'}}>{item.title}</FormHelperText>
             </ListItem>
          ))}
        </List>
        <Modal
            open={open}
            onClose={handleOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h1">
                ENLACE DE INVITADO
            </Typography>
            <TextField   id="outlined-basic" defaultValue={"https://clever-cobbler-49ca39.netlify.app/"+room} size="small"
            variant="outlined" fullWidth/>
            <Typography id="modal-modal-title" variant="h6" component="h1" mt={2}>
                PARTICIPANTES:
            </Typography>
            <List>
              {correos.map((item)=>(
                <ListItem disablePadding sx={{ display: 'block'}}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    {item} 
                    <IconButton onClick={()=>quitar(item)}>
                      <Tooltip title="Eliminar">
                      <Delete/>
                      </Tooltip>
                      </IconButton>
                  </Typography>
                </ListItem>
              ))}
            </List>
            <Button variant="contained" onClick={handleOpen2}>Agregar Correo</Button>
            </Box>
          </Modal>
          <Modal
            open={open2}
            onClose={handleOpen2}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} component="form" noValidate onSubmit={handleSubmit}>
            <Typography id="modal-modal-title" variant="h6" component="h1">
                AGREGAR AL PROYECTO
            </Typography>
            <TextField   id="Email" name="Email" size="small"
            variant="outlined" fullWidth/>
            <Button variant="contained" onClick={handleOpen2} sx={{mt:2}}>Cancelar</Button>
            <Button variant="contained" type="submit" sx={{mt:2, ml:2}}>Aceptar</Button>
            </Box>
          </Modal>
      </Drawer>
        </div>
      </div>
    )
  }