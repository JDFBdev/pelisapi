import React, {useState, useEffect} from "react"
import axios from "axios"
import {useNavigate} from 'react-router-dom'
import Card from "../card/card";
import s from "./buscador.module.css"
import Swiper from '../Swiper/Swiper';
let apiKey = '9606b913162ebfc8b1e68fc22f824e10';

export default function Buscador(){
    const[input, setInput] = useState('');
    const[peliculas, setPeliculas] = useState([]);
    const Navigate = useNavigate();
    const [populares, setPopulares] = useState(true);

    const handleInput = function(e){
      setInput(e.target.value);
    }

    const handlePopular = async function(){
        let promise = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`)
        let response = promise.data;

        setPopulares(true);
        setPeliculas(response.results);
        sessionStorage.removeItem("buscados");
    }

    const handleGeneros = function() {
        let accion = [];
        let animacion = [];
        let drama = [];
        let ficcion = [];
        for (let peli in peliculas) {
            for (let id_genero in peliculas[peli].genre_ids) {
                if (peliculas[peli].genre_ids[id_genero] == "28") {
                    accion.push(peliculas[peli]);
                }
                if (peliculas[peli].genre_ids[id_genero] == "16") {
                    animacion.push(peliculas[peli]);
                }
                if (peliculas[peli].genre_ids[id_genero] == "18") {
                    drama.push(peliculas[peli]);
                }
                if (peliculas[peli].genre_ids[id_genero] == "878") {
                    ficcion.push(peliculas[peli]);
                }
            }
        }
        console.log(accion);
        return (
        <>
            <Swiper peliculas={peliculas} />
            <Swiper peliculas={accion} />
            <Swiper peliculas={animacion} />
            <Swiper peliculas={drama} />
            <Swiper peliculas={ficcion} />
        </>
        )
    }

    const handleSubmit = async function(e){
        e.preventDefault()
        let promise = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${input}&page=1&include_adult=false`)
        let response = promise.data;
        
        setPopulares(false);
        setPeliculas(response.results);
        sessionStorage.setItem("buscados", JSON.stringify(response.results));
    }

    useEffect(() => {
        if (sessionStorage.getItem("buscados")) {
            let buscados = JSON.parse(sessionStorage.getItem("buscados"));
            setPeliculas(buscados);
            setPopulares(false);
        } else {
            handlePopular();
        }
    }, []);
    
    return (
        <div>
            <input className={s.input}  name='input' onChange={handleInput} onSubmit={handleSubmit}></input>
            <button onClick={handleSubmit}>Buscar</button>
            <button onClick={()=>Navigate("/favs")}>Favoritos</button>
            <button onClick={handlePopular}>Populares</button>
            {
                (populares) &&
                handleGeneros()
            }
            <div className={s.cards}>
            {
                (!populares) &&
                peliculas?.map((p)=>{
                    return <Card pelicula={p} />
                })
            }
            </div>
        </div>
    )
}