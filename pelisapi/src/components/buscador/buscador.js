import React, {useState, useEffect} from "react"
import axios from "axios"
import {useNavigate} from 'react-router-dom'
import Card from "../card/card";
import s from "./buscador.module.css"
import Swiper from '../Swiper/Swiper';
import ParticleBackground from 'react-particle-backgrounds';
import { useModal } from "react-hooks-use-modal";
import { CSSTransition } from "react-transition-group";
import Pelicula from "../pelicula/pelicula";
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

export default function Buscador({color10}){
    const[input, setInput] = useState('');
    const[peliculas, setPeliculas] = useState([]);
    const Navigate = useNavigate();
    const [populares, setPopulares] = useState(true);
    const [selected, setSelected] = useState({});
    const [Modal, open] = useModal('root', {
        preventScroll: true,
        closeOnOverlayClick: true
    });

    const handleInput = function(e){
      setInput(e.target.value);
    }

    const handlePopular = async function(){
        
        let promise1 = axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`)
        let promise2 = axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=2`)
        let promise3 = axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=3`)
        let response = [];
        
        await Promise.all([promise1,promise2,promise3]).then(values=>{
            response = values[0].data.results.concat(values[1].data.results);
            response = response.concat(values[2].data.results);
        })

        setPopulares(true);
        setPeliculas(response);
        sessionStorage.removeItem("buscados");
    }

    const handleGeneros = function() {
        let accion = [];
        let animacion = [];
        let drama = [];
        let ficcion = [];
        for (let peli in peliculas) {
            for (let id_genero in peliculas[peli].genre_ids) {
                if (peliculas[peli].genre_ids[id_genero] === 28) {
                    accion.push(peliculas[peli]);
                }
                if (peliculas[peli].genre_ids[id_genero] === 16) {
                    animacion.push(peliculas[peli]);
                }
                if (peliculas[peli].genre_ids[id_genero] === 18) {
                    drama.push(peliculas[peli]);
                }
                if (peliculas[peli].genre_ids[id_genero] === 878) {
                    ficcion.push(peliculas[peli]);
                }
            }
        }
        return (
        <>
            <h3 className={s.swiperTitle}>Trending</h3>
            <Swiper peliculas={peliculas} color10={color10} setSelected={setSelected} open={open} />
            <h3 className={s.swiperTitle}>Action</h3>
            <Swiper peliculas={accion} color10={color10} setSelected={setSelected} open={open} />
            <h3 className={s.swiperTitle}>Animation</h3>
            <Swiper peliculas={animacion} color10={color10} setSelected={setSelected} open={open} />
            <h3 className={s.swiperTitle}>Drama</h3>
            <Swiper peliculas={drama} color10={color10} setSelected={setSelected} open={open} />
            <h3 className={s.swiperTitle}>Sciene Fiction</h3>
            <Swiper peliculas={ficcion} color10={color10} setSelected={setSelected} open={open} />
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
        <div className={s.buscador}>
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
            <ParticleBackground settings={settings} className={s.background} />
            <div className={s.container}>
                {
                    (populares) &&
                    handleGeneros()
                }
                
                <div className={s.cards}>
                    {
                        (!populares) &&
                        peliculas?.map((p)=>{
                            return <Card key={p.id} pelicula={p} color10={color10} setSelected={setSelected} open={open} />
                        })
                    }
                </div>
            </div>
            <Modal>
            <CSSTransition
                in={true}
                timeout={0}
                appear={true}
                key={0}
                classNames={{ appear: s.MyClassEnterActive, enterDone: s.MyClassEnterDone}}
            >
                <Pelicula id={selected.id} />
            </CSSTransition>
            </Modal>
        </div>
    )
}