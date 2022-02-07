import React, {useState} from "react"
import axios from "axios"
import {useNavigate, Link} from 'react-router-dom'
import Card from "../card/card";
import s from "./buscador.module.css"

let apiKey = '6d022ee2';

export default function Buscador(){
    const[input, setInput] = useState('');
    const[peliculas, setPeliculas] = useState([]);

    const handleInput = function(e){
      setInput(e.target.value);
    }

    const handleSubmit = async function(e){
        e.preventDefault()
        let promise = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&s=${input}`)
        let response = promise.data;
        setPeliculas(response.Search);
    }
    
    return (
        <div>
            <input className={s.input}  name='input' onChange={handleInput} ></input>
            <button onClick={handleSubmit}>Submit</button>
            <div className={s.cards}>
            {
                peliculas?.map((p)=>{
                    return <Card pelicula={p}/>
                })
            }
            </div>
        </div>
    )
}