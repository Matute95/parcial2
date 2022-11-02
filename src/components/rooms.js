import { Add, ArrowForward } from "@mui/icons-material"
import { Button, Grid, IconButton, List, ListItem, ListItemText, Modal, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import { get, regProy } from "../conections/dbconnect"
import Board from "./canvas"

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

export default function Rooms(){
    const [proyectos, setProyectos] = useState([])
    const [open, setOpen] = useState(false);
    const [room, setRoom] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    async function load(){
        const data = await get("proyecto")
        setProyectos(data)
    }
    useEffect(() => {
      load()
    }, [])
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        regProy(data.get('Name'))
        load()
        handleClose()
      };
    return room?(<Board/>):(
        <Box>
        <Grid item xs={12}>
        <Typography sx={{ mt: 4, mb: 2, textAlign:"center" }} variant="h6" component="div">
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
                    <IconButton edge="end" aria-label="Ir"
                    onClick={()=>setRoom(true)}>
                    <ArrowForward/>
                    </IconButton>
                }>
                <ListItemText
                    primary={proyecto.nombre}
                />
                </ListItem>
                </List>
            </Grid>
            </Grid>
          ))}
          <Button sx={{ml:"45%", mt:3}} variant="contained" 
          endIcon={<Add/>} onClick={handleOpen}>Crear</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} component="form" noValidate onSubmit={handleSubmit}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                CREAR PROYECTO
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
            <Grid container justifyContent="flex-end">
            <Grid item>
                <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, ml: 1 }}>
                    Crear
                </Button>
            </Grid>
            </Grid>
            </Box>
          </Modal>
        </Box>
    )
}