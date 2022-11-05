import { Fragment } from "react";

export const Objeto = ({ shape, id, onShapePointerDown, selectionColor }) => {
    const { x, y, url, text } = shape;
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
        <div class="texto">{text}</div>
      </div>
        </Fragment>
    )
  }