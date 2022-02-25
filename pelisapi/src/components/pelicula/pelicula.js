import React, {useState, useEffect} from "react"
import { useNavigate } from 'react-router-dom'
import { useParams } from "react-router-dom";
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

export default function Pelicula(){
    let params = useParams();
    const[pelicula, setPelicula] = useState({});
    const Navigate = useNavigate();

    useEffect(async () => {
        let promise = await axios.get(`https://api.themoviedb.org/3/movie/${params.id}}?api_key=${apiKey}&language=en-US`)
        let response = promise.data;
        setPelicula(response);
    }, []);
  
    return (
        <div className={s.container}>
            {/* <ParticleBackground settings={settings} className={s.background}/> */}
            <div className={s.navbar}>
                <div className={s.btns}>
                    <button className={s.btn} onClick={()=>Navigate('/')}>Main page</button>
                </div>
            </div>
            <div className={s.info}>
                <h1>{pelicula.title}</h1>
                <div>
                    <p>{pelicula.release_date}</p>
                    <p>{pelicula.vote_average}</p>
                    <p>{pelicula.runtime}</p>
                </div>
                <img src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`} className={s.img}/>
                <div className={s.descripcion}>
                    <p>{pelicula.overview}</p>
                </div>
            </div>
        </div>
    )
}