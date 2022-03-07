import React, {useState, useEffect} from "react"
import axios from "axios";
import s from "./pelicula.module.css";
import ParticleBackground from 'react-particle-backgrounds';
let apiKey = '9606b913162ebfc8b1e68fc22f824e10';

const settings = {
    canvas: {
        canvasFillSpace: true,
        width: 200,
        height: 1000,
        useBouncyWalls: false
    },
    particle: {
      particleCount: 35,
      color: "#fff",
      minSize: 2,
      maxSize: 6
    },
    velocity: {
      minSpeed: 0.2,
      maxSpeed: 0.4
    },
    opacity: {
      minOpacity: 0,
      maxOpacity: 0.6,
      opacityTransitionTime: 10000
    }
  }

export default function Pelicula({id}){
    
    const[pelicula, setPelicula] = useState({});

    useEffect(async () => {
        let promise = await axios.get(`https://api.themoviedb.org/3/movie/${id}}?api_key=${apiKey}&language=en-US`)
        let response = promise.data;
        setPelicula(response);
    }, []);
  
    return (
        <div className={s.container}>
            <ParticleBackground settings={settings} className={s.background}/>
            <div className={s.info}>
                <h1 className={s.titulo}>{pelicula.title}</h1>
                <div>
                    <p className={s.detalles}>Release Date: {pelicula.release_date}</p>
                    <p className={s.detalles}>Rating: {pelicula.vote_average}</p>
                    <p className={s.detalles}>Runtime: {pelicula.runtime} min</p>
                </div>
                <img src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`} className={s.img}/>
                <div className={s.descripcion}>
                    <p className={s.detalles}>{pelicula.overview}</p>
                </div>
            </div>
        </div>
    )
}