import React from "react";
import Card from "../card/card";
import s from "./favs.module.css"

export default function Favs() {
    const favs = JSON.parse(localStorage.getItem("favs"));

    return (
        <div>
            <h3>Favoritos</h3>
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