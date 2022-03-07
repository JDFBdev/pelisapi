import React, { useState } from "react";
import Card from "../card/card";
import s from "./favs.module.css"
import ParticleBackground from 'react-particle-backgrounds';
import {useNavigate} from 'react-router-dom'
import { useModal } from "react-hooks-use-modal";
import { CSSTransition } from "react-transition-group";
import Pelicula from "../pelicula/pelicula";

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
    const [selected, setSelected] = useState({});
    const [Modal, open] = useModal('root', {
        preventScroll: true,
        closeOnOverlayClick: true
    });
    const Navigate = useNavigate();
    const favs = JSON.parse(localStorage.getItem("favs"));
    

    return (
        <div className={s.container}>
            <ParticleBackground settings={settings} className={s.background}/>
            <div className={s.navbar}>
                <div className={s.btns}>
                    <button className={s.btn} onClick={()=>Navigate('/')}>Main page</button>
                </div>
            </div>
            
            <h3 className={s.title} >Favorites</h3>
            <div className={s.cards}>
            {
                favs?.map((p)=>{
                    return <Card key={p.id} pelicula={p} setSelected={setSelected} open={open} />
                })
            }
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