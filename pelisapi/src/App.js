import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
 
function App() {

  const[input, setInput] = useState('');

  const handleInput = function(e){
    setInput(e.target.value);
  }

  console.log(input);

  return (
    <div className="App">
      <input name='input' onChange={handleInput} ></input>
    </div>
  );
}

export default App;
