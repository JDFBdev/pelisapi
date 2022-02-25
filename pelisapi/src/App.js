import './App.css';
import React, {useEffect, useState} from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Buscador from './components/buscador/buscador';
import Pelicula from './components/pelicula/pelicula';
import Favs from './components/favs/favs';
import { Toaster } from "react-hot-toast";
 
function App() {
  const [counter, setCounter] = useState(6);
  const [color10,setColor] = useState({r:173, g:0, b: 0})

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    counter === 0 && setCounter(6)
    if (counter === 6){
        setColor({r:173, g: 0, b:0})
    }
    if (counter === 5){
        setColor({r:173, g: 173, b:0})
    }
    if (counter === 4){
        setColor({r:0, g: 173, b:0})
    }
    if (counter === 3){
        setColor({r:0, g: 173, b:173})
    }
    if (counter === 2){
        setColor({r:0, g: 0, b:173})
    }
    if (counter === 1){
        setColor({r:173, g: 0, b:173})
    }

}, [counter]);

  return (
    <div className="App">
      <Toaster/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Buscador color10={color10}/>}/>
          <Route path="/pelicula/:id" element={<Pelicula/>}/>
          <Route path="/favs" element={<Favs/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
