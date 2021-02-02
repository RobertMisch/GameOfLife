import React, { useState } from 'react';
import './App.css';
import Grid from './components/Grid'
import {GridContext} from './contexts/GridContext';

function App() {
  const [grid, setGrid]=useState([])
  return (
    <div className="App">
      <p>Game of life</p>
      <GridContext.Provider value={{grid, setGrid}}>
        <Grid />
      </GridContext.Provider>
    </div>
  );
}

export default App;
