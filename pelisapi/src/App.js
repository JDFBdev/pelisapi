import './App.css';
import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Buscador from './components/buscador/buscador';
import Pelicula from './components/pelicula/pelicula';
import Favs from './components/favs/favs';
 
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Buscador/>}/>
          <Route path="/pelicula/:imdbID" element={<Pelicula/>}/>
          <Route path="/favs" element={<Favs/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
