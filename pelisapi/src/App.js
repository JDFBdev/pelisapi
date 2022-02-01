import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import Buscador from './components/buscador/buscador';
 
function App() {
  return (
    <div className="App">
      <Buscador titulo="titulo"/>
    </div>
  );
}

export default App;
