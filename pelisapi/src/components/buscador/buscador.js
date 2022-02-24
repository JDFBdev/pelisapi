import React, {useState, useEffect} from "react"
import axios from "axios"
import {useNavigate} from 'react-router-dom'
import Card from "../card/card";
import s from "./buscador.module.css"
import Swiper from '../Swiper/Swiper';
import ParticleBackground from 'react-particle-backgrounds';
let apiKey = '9606b913162ebfc8b1e68fc22f824e10';

const settings = {
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

export default function Buscador(){
    const[input, setInput] = useState('');
    const[peliculas, setPeliculas] = useState([]);
    const Navigate = useNavigate();

    const handleInput = function(e){
      setInput(e.target.value);
    }

    const handlePopular = async function(){
        let promise = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`)
        let response = promise.data;
       
        setPeliculas(response.results);
        sessionStorage.setItem("buscados", JSON.stringify(response.results));
    }

    const handleSubmit = async function(e){
        e.preventDefault()
        let promise = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${input}&page=1&include_adult=false`)
        let response = promise.data;
       
        setPeliculas(response.results);
        sessionStorage.setItem("buscados", JSON.stringify(response.results));
    }

    useEffect(() => {
        if (sessionStorage.getItem("buscados")) {
            let buscados = JSON.parse(sessionStorage.getItem("buscados"));
            setPeliculas(buscados)
        } else {
            handlePopular();
        }
    }, []);
    
    return (
        <div className={s.buscador}>
            <ParticleBackground settings={settings} style={{position: 'absolute', zIndex:'-1'}}/>
            <div className={s.navbar}>
                <div className={s.inputDiv}>
                    <input className={s.input} name='input' onChange={handleInput} onSubmit={handleSubmit}></input>
                    <button className={s.btn} onClick={handleSubmit}>Search</button>
                </div>
                <div className={s.btns}>
                    <button className={s.btn} onClick={()=>Navigate("/favs")}>Favorites</button>
                    <button className={s.btn} onClick={handlePopular}>Trending</button>
                </div>
            </div>
            <div className={s.container}>
                <Swiper peliculas={peliculas} />
            </div>
        </div>
    )
}