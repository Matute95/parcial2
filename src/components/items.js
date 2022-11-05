import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { Fragment, useState } from "react";

export const Objeto = ({ shape, id, onShapePointerDown, selectionColor, changeText }) => {
    const { x, y, url, text } = shape;
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
        console.log(event)
        changeText(data.get('descripcion'))
        handleClose()
    }
    return (
        <Fragment>
        <div
        onPointerDown={(e) => onShapePointerDown(e, id)}
        className="item"
        style={{
          transform: `translate(${x}px, ${y}px)`,
          borderColor: selectionColor || "transparent"
        }}
      >
        <img src={url} alt="img"></img>
        <div class="texto" onClick={handleOpen}>{text}</div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Editar</DialogTitle>
            <Box component="form" noValidate onSubmit={editar}>
            <DialogContent>
            <TextField
                autoFocus
                id="desc"
                label="Descripcion"
                multiline
                rows={4}
                name='descripcion'
                fullWidth
              />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Aceptar</Button>
          </DialogActions></Box>
          
        </Dialog>
      </div>
        </Fragment>
    )
  }