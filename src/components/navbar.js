import { auth } from '../conections/firebase';
import { StrictMode, useState, useEffect } from 'react';
import { RoomProvider } from '../conections/liveblocks.config';
import { LiveMap } from '@liveblocks/client';
import { Add, ArrowForward , AccountCircle, Delete} from "@mui/icons-material"
import { Button, Grid, IconButton, List, ListItem, MenuItem,
         Modal, TextField, Typography, Menu,
        CssBaseline, AppBar, Box, Toolbar, Tooltip, FormControl, InputLabel, Select} from "@mui/material"
import { deleteProy, editProy, getProyectos, getUsuario, regProy } from "../conections/dbconnect"
import Board from "./canvas"
import { useParams } from 'react-router-dom';

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

export default function MenuAppBar() {
  const [room, setRoom] = useState("default")
  const [modal, setModal] = useState("crear")
  const [anchorEl, setAnchorEl] = useState(null)
  const [proyectos, setProyectos] = useState([])
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { id } = useParams()
  const [usuario, setUsuario] = useState([])
  const [tipo, setTipo] = useState('');
  const handleChange = (event) => {
    setTipo(event.target.value);
  };
  useEffect(() => {
    async function cargar(){
      const user = await getUsuario()
      setUsuario(user)
      }
    id===undefined?load():setRoom(id)
    cargar()
    // eslint-disable-next-line
  }, [])
  async function load(){
    const data = await getProyectos()
    setProyectos(data)
}
  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    modal==="crear"?
    regProy(data.get('Name'), tipo):
    editProy(modal, data.get('Name'), tipo)
    load()
    handleClose()
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const anchor = () => {
    setAnchorEl(null);
  }
  const out = async() => {
    await auth.signOut()
    window.location.reload()
  }
  const crear = () => {
    setModal("crear")
    handleOpen()
  }
  const editar = (id) => {
    setModal(id)
    handleOpen()
  }
  const eliminar = async(id) => {
    await deleteProy(id)
    window.location.reload()
  }
  return (
    <StrictMode>
    <RoomProvider
      id = {room}
      initialStorage={{
        shapes: new LiveMap(),
      }}>
      <Box sx={{ flexGrow: 1 }}><CssBaseline/>
      <AppBar position="fixed"
        sx={{ width: `calc(100% - ${room==="default"?0:90}px)`, ml: `${room==="default"?0:90}px` }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
            <strong>Segundo parcial</strong>
          </Typography>
            <div>
              {!auth.currentUser?null:
                <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>}
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={anchor}
              >
                <MenuItem>{usuario.nombre} {usuario.apellido}</MenuItem>
                <MenuItem>{usuario.plan}</MenuItem>
                <MenuItem onClick={out}>Cerrar Sesion</MenuItem>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1 }}>
        {room==="default"?(
        <Box>
        <Grid item xs={12}>
        <Typography sx={{ mt: 4, mb: 2, textAlign:"center" }} variant="h5" component="div">
            <strong>{proyectos===[]?"Cree su primer proyecto":"Proyectos Creados"}</strong>
        </Typography>
        </Grid>
          {proyectos?.map((proyecto)=>(
            <Grid xs spacing={3} display="flex"
            justifyContent="center" alignItems="center">
            <Grid item xs={12} md={6}>
                <List>
                <ListItem
                secondaryAction={
                  <Tooltip title="Entrar">
                    <IconButton edge="end" aria-label="Ir"
                    onClick={()=>setRoom(proyecto.id)}>
                    <ArrowForward/>
                    </IconButton>
                  </Tooltip>
                }>
                <Tooltip title="Borrar">
                <IconButton onClick={()=>eliminar(proyecto.id)}>
                <Delete/>
                </IconButton>
                </Tooltip>
                <Tooltip title="Cambiar Nombre">
                <IconButton onClick={()=>editar(proyecto.id)}>
                    {proyecto.nombre}
                </IconButton>
                </Tooltip>
                </ListItem>
                </List>
            </Grid>
            </Grid>
          ))}
          <Button sx={{ml:"45%", mt:3}} variant="contained" 
          endIcon={<Add/>} onClick={crear}>Crear</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} component="form" noValidate onSubmit={handleSubmit}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                {modal==="crear"?"CREAR PROYECTO":"EDITAR PROYECTO"}
            </Typography>
            <Grid item xs={12}>
                <TextField
                    required
                    id="Name"
                    name="Name"
                    label="Nombre del Proyecto"
                    size="small"
                    fullWidth
                    sx={{mt:2}}
                />
            </Grid>
            <br/>
            <Grid item xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={tipo}
                label="Tipo"
                onChange={handleChange}
              >
                <MenuItem value="publico">Publico</MenuItem>
                <MenuItem value="privado">Privado</MenuItem>
              </Select>
            </FormControl>
            </Grid>
            <Grid container justifyContent="flex-end">
            <Grid item>
                <Button
                onClick={handleClose}
                variant="contained"
                sx={{ mt: 3, ml: 1 }}>
                    cancelar
                </Button>
            </Grid>
            <Grid item>
                <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, ml: 1 }}>
                    {modal==="crear"?"crear":"aceptar"}
                </Button>
            </Grid>
            </Grid>
            </Box>
          </Modal>
        </Box>
    ):(<Board room={room}/>)}
      </Box>
    </Box>
    </RoomProvider>
  </StrictMode>
  );
}