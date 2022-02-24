import React from "react";
import Card from "../card/card";
import s from "./favs.module.css"
import ParticleBackground from 'react-particle-backgrounds';
import {useNavigate} from 'react-router-dom'

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

export default function Favs() {
    const Navigate = useNavigate();
    const favs = JSON.parse(localStorage.getItem("favs"));

    return (
        <div className={s.container}>
            <div className={s.navbar}>
                <div className={s.btns}>
                    <button className={s.btn} onClick={()=>Navigate('/')}>Main page</button>
                </div>
            </div>
            <ParticleBackground settings={settings} className={s.background}/>
            <h3 className={s.title} >Favorites</h3>
            <div className={s.cards}>
            {
                favs?.map((p)=>{
                    return <Card pelicula={p}/>
                })
            }
            </div>
        </div>
    )
}