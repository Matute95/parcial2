import { useState } from "react"
import { useMap, useMyPresence, useOthers, useHistory } from "../conections/liveblocks.config"
import List from '@mui/material/List'
import { Delete, Link, Redo, Undo } from "@mui/icons-material"
import Drawer from "@mui/material/Drawer"
import { Box, IconButton, ListItem, Modal, TextField, Tooltip, Typography } from "@mui/material"
import { Objeto } from "./items"

//const COLORS = ["#DC2626", "#D97706", "#059669", "#7C3AED", "#DB2777"]
const style = {
  position: 'absolute',
  top: '50%',
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

var link = ""

export default function Board(item){
    const shapes = useMap("shapes")
    if (shapes == null) {
        return <div className="loading">Cargando...</div>
    }
    link = "https://clever-cobbler-49ca39.netlify.app/"+item.room
    return <Canvas shapes={shapes} item={item}/>
}

function Canvas({ shapes }) {
    const [isDragging, setIsDragging] = useState(false);
    const [{ selectedShape }, setPresence] = useMyPresence();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const others = useOthers();
    const history = useHistory();
    const insertItem = (ref) => {
      const shapeId = Date.now().toString();
      const item = {
        x: 15+getRandomInt(300),
        y: 15+getRandomInt(300),
        url: ref,
        text: "Descripcion"
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
            x: e.clientX - 50,
            y: e.clientY - 100,
          });
        }
      }
    };
    const persona = "https://firebasestorage.googleapis.com/v0/b/segundo-parcial-111e9.appspot.com/o/5.png?alt=media&token=e91e4ebd-04b1-4bf6-a698-7bb24f243d96"
    const objeto = "https://firebasestorage.googleapis.com/v0/b/segundo-parcial-111e9.appspot.com/o/1.png?alt=media&token=791d3067-d955-4f3b-a92b-8194d0f925b9"
    const db = "https://firebasestorage.googleapis.com/v0/b/segundo-parcial-111e9.appspot.com/o/2.png?alt=media&token=f752991f-d546-4a39-81b2-fb8cd62eb979"
    const app = "https://firebasestorage.googleapis.com/v0/b/segundo-parcial-111e9.appspot.com/o/3.png?alt=media&token=78ee0763-3c3b-4a41-bbc2-1dbd2e75cb88"
    const navegador = "https://firebasestorage.googleapis.com/v0/b/segundo-parcial-111e9.appspot.com/o/4.png?alt=media&token=5be8a78e-50e7-46e4-a2c8-ab631eb1e9c1"
    const sistema = "https://firebasestorage.googleapis.com/v0/b/segundo-parcial-111e9.appspot.com/o/6.png?alt=media&token=738e838a-ee81-4395-bf5a-23e62ad3f3d9"
    const data = [
      {icon: <Link/>, function: handleOpen, title: "Enlace de invitado", insert:false},
      {icon: <Undo/>, function: history.undo, title: "Deshacer", insert:false},
      {icon: <Redo/>, function: history.redo, title: "Rehacer", insert:false},
      {icon: <Delete/>, function: deleteItem, title: "Eliminar", insert:false},
      {icon: <img src={persona} alt="img"></img>, title: "Persona", insert:true, ref:persona},
      {icon: <img src={objeto} alt="img"></img>,  title: "Componente", insert:true, ref:objeto},
      {icon: <img src={db} alt="img"></img>, title: "Base de Datos", insert:true, ref:db},
      {icon: <img src={app} alt="img"></img>, title: "App Mobil", insert:true, ref:app},
      {icon: <img src={navegador} alt="img"></img>, title: "Navegador", insert:true, ref:navegador},
      {icon: <img src={sistema} alt="img"></img>, title: "Sistema", insert:true, ref:sistema}]
    return (
      <>
        <div className="canvas"
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
                />
              );
          })}
        </div>
        <div>
        <Drawer variant="permanent" anchor="left">
        <List>
          {data.map((item)=>(
            <Tooltip title={item.title}>
             <ListItem disablePadding sx={{ display: 'block' }}>
             <IconButton onClick={ item.insert?()=>insertItem(item.ref):item.function }
              sx={{
                minHeight: 35,
                height:35,
                justifyContent: 'center',
                px: 2.5,
                minWidth: 0,
                mr: 'auto',
                mt: 2
              }}
            >
             {item.icon}
            </IconButton>
             </ListItem>
          </Tooltip>
          ))}
        </List>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                ENLACE DE INVITADO
            </Typography>
            <TextField   id="outlined-basic" defaultValue={link} variant="outlined" fullWidth/>
            </Box>
          </Modal>
      </Drawer>
        </div>
      </>
    )
  }