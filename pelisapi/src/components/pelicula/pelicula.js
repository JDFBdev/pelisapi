import React, {useState, useEffect} from "react"
import axios from "axios";
import s from "./pelicula.module.css";
import ParticleBackground from 'react-particle-backgrounds';
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import toast from "react-hot-toast";
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
    const [fav, setFav] = useState(false);
    const[pelicula, setPelicula] = useState({});

    useEffect(() => {
        async function fetchData() {
        let promise = await axios.get(`https://api.themoviedb.org/3/movie/${id}}?api_key=${apiKey}&language=en-US`)
        let response = promise.data;
        setPelicula(response);
        }
        fetchData();
    });

    useEffect(() => {
        let favs = JSON.parse(localStorage.getItem("favs"));
        if (!favs) {
            return
        }
        for (let peliFavs of favs) {
            if (pelicula.id === peliFavs.id){
                pelicula.fav = true;
                setFav(true);
            }
        }
    },[pelicula]);

    let favs = []
    function handleFav(e) {
        if (localStorage.getItem("favs")) {
            favs = JSON.parse(localStorage.getItem("favs"));
        }
        if (fav) {
            toast.error("Already in Favorites")
        } else {
            favs.push(pelicula);
            localStorage.setItem("favs", JSON.stringify(favs));
            toast.success("Added to Favorites");
            setFav(true);
        }
    }

    return (
        <div className={s.container}>
            <ParticleBackground settings={settings} className={s.background}/>
            <div className={s.info}>
                <h1 className={s.titulo}>{pelicula.title}</h1>
                {
                    fav ?
                    <div className={s.favContainer}><AiFillStar className={s.fav}/></div> :
                    <div className={s.favContainer}><AiOutlineStar onClick={handleFav} className={s.fav}/></div>  
                }
                <div>
                    <p className={s.detalles}>Release Date: {pelicula.release_date}</p>
                    <p className={s.detalles}>Rating: {pelicula.vote_average}</p>
                    <p className={s.detalles}>Runtime: {pelicula.runtime} min</p>
                </div>
                <img alt='poster' src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`} className={s.img}/>
                <div className={s.descripcion}>
                    <p className={s.detalles}>{pelicula.overview}</p>
                </div>
            </div>
        </div>
    )
}