import { Fragment, useState } from "react"
import { useMap, useMyPresence, useOthers } from "../conections/liveblocks.config"
import List from '@mui/material/List'
import { Delete, PersonAdd } from "@mui/icons-material"
import Drawer from "@mui/material/Drawer"
import { IconButton, ListItem, Tooltip } from "@mui/material"

//const COLORS = ["#DC2626", "#D97706", "#059669", "#7C3AED", "#DB2777"]
function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

export default function Board(){
    const shapes = useMap("shapes")
    if (shapes == null) {
        return <div className="loading">Cargando...</div>
    }
    return <Canvas shapes={shapes}/>
}

function Canvas({ shapes }) {
    const [isDragging, setIsDragging] = useState(false);
    const [{ selectedShape }, setPresence] = useMyPresence();
    const others = useOthers();
    const insertRectangle = () => {
      const shapeId = Date.now().toString();
      const rectangle = {
        x: getRandomInt(300),
        y: getRandomInt(300),
        fill: "#eeeeee",
      };
      shapes.set(shapeId, rectangle);
    };
    const onShapePointerDown = (e, shapeId) => {
      e.stopPropagation();
      setPresence({ selectedShape: shapeId })
      setIsDragging(true);
    };
    const deleteRectangle = () => {
      shapes.delete(selectedShape);
      setPresence({ selectedShape: null })
    };
    const onCanvasPointerUp = (e) => {
      if (!isDragging) {
        setPresence({ selectedShape: null })
      }
      setIsDragging(false)
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
    const data = [
      {icon: <PersonAdd/>, function: insertRectangle, title: "Agregar Persona"},
      {icon: <Delete/>, function: deleteRectangle, title: "Eliminar"}]
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
                <Rectangle
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
             <IconButton onClick={item.function}
              sx={{
                minHeight: 48,
                justifyContent: 'center',
                px: 2.5,
                minWidth: 0,
                mr: 'auto',
              }}
            >
              {item.icon}
            </IconButton>
             </ListItem>
          </Tooltip>
          ))}
        </List>
      </Drawer>
        </div>
      </>
    )
  }
  
  const Rectangle = ({ shape, id, onShapePointerDown, selectionColor }) => {
    const { x, y, fill } = shape;
  
    return (
        <Fragment>
        <div
        onPointerDown={(e) => onShapePointerDown(e, id)}
        className="rectangle"
        style={{
          transform: `translate(${x}px, ${y}px)`,
          backgroundColor: fill ? fill : "#CCC",
          borderColor: selectionColor || "transparent"
        }}
      >
        <img src="https://cdn-icons-png.flaticon.com/512/265/265674.png" alt="img"></img>
      </div>
        </Fragment>
    )
  }