import React from "react";
import s from "./card.module.css"
import { useNavigate } from "react-router-dom";
import { AiOutlineStar } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa"
import toast from "react-hot-toast";
import { AiFillStar } from "react-icons/ai";

export default function Card({pelicula}) {
    const Navigate = useNavigate();
    const url = window.location.href.slice(21);

    let favs = []
    function handleFav(e) {
        if (localStorage.getItem("favs")) {
            favs = JSON.parse(localStorage.getItem("favs"));
        }
        favs.push(pelicula);
        localStorage.setItem("favs", JSON.stringify(favs));
        stopBubbling(e);
        toast.success("Faveado");
    }

    function handleRemoveFav(e) {
        if (localStorage.getItem("favs")) {
            favs = JSON.parse(localStorage.getItem("favs"));
        }
        let filtrado = favs.filter((p)=>{return p.imdbID != pelicula.imdbID})
        localStorage.setItem("favs", JSON.stringify(filtrado));
        stopBubbling(e);
        window.location.reload(false);
    }

    function stopBubbling(e){
        e.stopPropagation();
        e.cancelBubble = true;
    }

    return (
        <div className={s.container} onClick={(e)=>{stopBubbling(e); Navigate(`/pelicula/${pelicula.imdbID}`)}}>
            <p>{pelicula.Title}</p>
            {
                url === '/' &&
                <AiOutlineStar size={"2rem"} onClick={handleFav} className={s.fav}/>       
            }
            {
                url === '/favs' && 
                <FaRegTrashAlt size={"2rem"} onClick={handleRemoveFav} className={s.fav}/>  
            }

            <p>{pelicula.Year}</p>
            <img src={pelicula.Poster}></img>
        </div>
    )
}