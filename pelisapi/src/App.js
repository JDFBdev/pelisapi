import './App.css';
import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Buscador from './components/buscador/buscador';
import Pelicula from './components/pelicula/pelicula';
 
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Buscador/>}/>
          <Route path="/pelicula/:imdbID" element={<Pelicula/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
