import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { Fragment, useState } from "react";

export const Objeto = ({ shape, id, onShapePointerDown, selectionColor, changeText }) => {
    const { x, y, url, text, height, width } = shape;
    return (
        <Fragment>
          {url.length>10?
          <div
          onPointerDown={(e) => onShapePointerDown(e, id)}
          className="item"
          style={{
            transform: `translate(${x}px, ${y}px)`,
            borderColor: selectionColor || "transparent",
            height: `${height}px`,
            width: `${width}px`,
            borderStyle: "solid"
          }}>
          <div>
          <img src={url} alt="img" style={{height: `${height-5}px`, width: `${width-5}px`}}></img>
          <Texto changeText={changeText} text={text} tipo={"texto"}/>
          </div></div>:url==="contenedor"?<div
          onPointerDown={(e) => onShapePointerDown(e, id)}
          className="item"
          style={{
            transform: `translate(${x}px, ${y}px)`,
            borderColor: "black",
            height: `${height*3}px`,
            width: `${width*3}px`,
            borderStyle: "dashed"
          }}><Container/></div>:<div
          onPointerDown={(e) => onShapePointerDown(e, id)}
          className="item"
          style={{
            transform: `translate(${x}px, ${y}px)`,
            borderColor: selectionColor || "transparent",
            height: `${height/3}px`,
            width: `${width}px`,
            borderStyle: "dashed"
          }}><Texto changeText={changeText} text={text} tipo={"texto2"}/></div>}
        </Fragment>
    )
  }

  function Texto({changeText, text, tipo}){
    const [open, setOpen] = useState(false);
    const handleClose = () => {
      setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
      };
    const editar = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        changeText(data.get('descripcion'))
        handleClose()
    }
    return (
      <div>
        <div class={tipo} onClick={handleOpen}>{text}</div>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Editar</DialogTitle>
              <Box component="form" noValidate onSubmit={editar}>
              <DialogContent>
              <TextField
                  autoFocus id="desc" label="Descripcion" multiline
                  rows={4} name='descripcion' fullWidth
                />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Aceptar</Button>
            </DialogActions>
            </Box>
          </Dialog>
      </div>
    )
  }