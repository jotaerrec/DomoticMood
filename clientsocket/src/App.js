import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://192.168.43.97:3000";
const socket = socketIOClient(ENDPOINT);

const sendSocket = ()=> {
  socket.emit("responsePong", "reactjs") 
}

const App = () => {
  const [response, setResponse] = useState("");
  
  useEffect(() => {
  }, []);
  return (
    
    <div className="App">
      Hola
      <button onClick={sendSocket}>Send Socket</button>
    </div>
  );
}

export default App;
