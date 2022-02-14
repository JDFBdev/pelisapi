import React, {useState, useEffect} from "react"
import axios from "axios"
import {useNavigate} from 'react-router-dom'
import Card from "../card/card";
import s from "./buscador.module.css"

let apiKey = '6d022ee2';

export default function Buscador(){
    const[input, setInput] = useState('');
    const[peliculas, setPeliculas] = useState([]);
    const Navigate = useNavigate();

    const handleInput = function(e){
      setInput(e.target.value);
    }

    const handleSubmit = async function(e){
        e.preventDefault()
        let promise = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&s=${input}`)
        let response = promise.data;
        let favs = JSON.parse(localStorage.getItem("favs"));
        console.log(favs[0].imdbID);
        console.log(response.Search[0].imdbID);
        for (let peliResponse of response.Search) {
            for (let peliFavs of favs) {
                if (peliResponse.imdbID == peliFavs.imdbID){
                    peliResponse.fav = true;
                } else {
                    peliResponse.fav = false;
                }
            }
        }

        setPeliculas(response.Search);
        sessionStorage.setItem("buscados", JSON.stringify(response.Search));
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