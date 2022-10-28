import { Fragment, useState } from "react"
import { useMap, useMyPresence, useOthers } from "./liveblocks.config"
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MuiDrawer from '@mui/material/Drawer'
import { styled } from '@mui/material/styles'
import { Delete, PersonAdd } from "@mui/icons-material"

//const COLORS = ["#DC2626", "#D97706", "#059669", "#7C3AED", "#DB2777"]
const drawerWidth = 240;
function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}
function getRandomColor() {
  return "#eeeeee"
}

export default function Board(){
    const shapes = useMap("shapes")
    if (shapes == null) {
        return <div className="loading">Cargando</div>
    }
    return <Canvas shapes={shapes}/>
}

function Canvas({ shapes }) {
    const [isDragging, setIsDragging] = useState(false);
    const [{ selectedShape }, setPresence] = useMyPresence();
    const others = useOthers();
    const open = false
    const insertRectangle = () => {
      const shapeId = Date.now().toString();
      const rectangle = {
        x: getRandomInt(300),
        y: getRandomInt(300),
        fill: getRandomColor(),
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
    const openedMixin = (theme) => ({
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
      });
      
      const closedMixin = (theme) => ({
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: `calc(${theme.spacing(7)} + 1px)`,
        [theme.breakpoints.up('sm')]: {
          width: `calc(${theme.spacing(8)} + 1px)`,
        },
      });
    const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
        ({ theme, open }) => ({
          width: drawerWidth,
          flexShrink: 0,
          whiteSpace: 'nowrap',
          boxSizing: 'border-box',
          ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
          }),
          ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
          }),
        }),
      );
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
        <Drawer variant="permanent" open={false}>
        <List>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton onClick={insertRectangle}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <PersonAdd />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton onClick={deleteRectangle}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <Delete/>
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
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