import React, { useState, useEffect } from 'react';
import './App.css';
import Calculator from './Calculator';
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";


const socket = socketIOClient(ENDPOINT);
function App() {
  const [results, addResult] = useState([]);

  const addCalculated = (calculated) => {
    socket.emit('calculated', {
      calculated
    })
  }

  useEffect(() => {    
    socket.on("calculated", data => {  
      addResult(data.results);
    });
  }, []);

  return (
    <div className="wrapper">
      <Calculator addCalculated={addCalculated}></Calculator>

      <ul className="show-output">{results.map((entry, index) =>
        <li key={index.toString()}>{entry.calculated}</li>
      )}
      </ul>

    </div >
  );
}

export default App;
