import React, {useState, useEffect} from "react"
import s from "./card.module.css"
import { useNavigate } from "react-router-dom";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa"
import toast from "react-hot-toast";

export default function Card({pelicula}) {
    const Navigate = useNavigate();
    const url = window.location.href.slice(21);
    const [fav, setFav] = useState(false);

    useEffect(() => {
        let favs = JSON.parse(localStorage.getItem("favs"));
        for (let peliFavs of favs) {
            if (pelicula.imdbID == peliFavs.imdbID){
                pelicula.fav = true;
                setFav(true);
            }
        }
    }, []);

    let favs = []
    function handleFav(e) {
        if (localStorage.getItem("favs")) {
            favs = JSON.parse(localStorage.getItem("favs"));
        }
        stopBubbling(e);
        console.log(pelicula);
        if (fav) {
            toast.error("Ya esta faveado")
        } else {
            favs.push(pelicula);
            localStorage.setItem("favs", JSON.stringify(favs));
            toast.success("Faveado");
            setFav(true);
        }
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
            {
                (url === '/' && fav) &&
                <div className={s.favContainer}><AiFillStar size={"2rem"} className={s.fav}/></div>    
            }
            {
                (url === '/' && !fav) &&
                <div className={s.favContainer}><AiOutlineStar size={"2rem"} onClick={handleFav} className={s.fav}/></div>    
            }
            {
                url === '/favs' && 
                <div className={s.favContainer}><FaRegTrashAlt size={"2rem"} onClick={handleRemoveFav} className={s.fav}/></div> 
            }
            <div className={s.info}>
                <p className={s.data}>{pelicula.Type.toUpperCase()}</p>
                <p className={s.data}>{pelicula.Year}</p>
                <div className={s.descriptionContainer}>
                    <p className={s.description}>
                        Earth Migtiest heroes go on a journey to get some hoes.
                        Will they get em hoes? Yes, they end up getting them.
                    </p>
                </div>
            </div>
            <div style={{ backgroundImage: "url(" + pelicula.Poster + ")"}} className={s.image}/>
            <div className={s.titleContainer}>
                <p className={s.title} >{pelicula.Title}</p>
            </div>
        </div>
    )
}