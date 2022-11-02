import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RoomProvider } from "./conections/liveblocks.config";
import { LiveMap } from "@liveblocks/client";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RoomProvider
      id="react-whiteboard-app"
      initialStorage={{
        shapes: new LiveMap(),
      }}
    >
      <App />
    </RoomProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
