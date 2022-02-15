import React, {useState, useEffect} from "react"
import axios from "axios"
import {useNavigate} from 'react-router-dom'
import Card from "../card/card";
import s from "./buscador.module.css"

let apiKey = '9606b913162ebfc8b1e68fc22f824e10';

export default function Buscador(){
    const[input, setInput] = useState('');
    const[peliculas, setPeliculas] = useState([]);
    const Navigate = useNavigate();

    const handleInput = function(e){
      setInput(e.target.value);
    }

    const handleSubmit = async function(e){
        e.preventDefault()
        let promise = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${input}&page=1&include_adult=false`)
        let response = promise.data;
        setPeliculas(response.result);
        sessionStorage.setItem("buscados", JSON.stringify(response.result));
    }

    useEffect(() => {
        if (sessionStorage.getItem("buscados")) {
            let buscados = JSON.parse(sessionStorage.getItem("buscados"));
            setPeliculas(buscados)
        }
    }, []);
    
    return (
        <div>
            <input className={s.input}  name='input' onChange={handleInput} onSubmit={handleSubmit}></input>
            <button onClick={handleSubmit}>Buscar</button>
            <button onClick={()=>Navigate("/favs")}>Favoritos</button>
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