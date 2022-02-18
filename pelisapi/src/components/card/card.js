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
        if (!favs) {
            return
        }
        for (let peliFavs of favs) {
            if (pelicula.id == peliFavs.id){
                pelicula.fav = true;
                setFav(true);
            }
        }
    }, []);

    useEffect(() => {
        setFav(false);
        let favs = JSON.parse(localStorage.getItem("favs"));
        if (!favs) {
            return
        }
        for (let peliFavs of favs) {
            console.log(pelicula.id , peliFavs.id)
            if (pelicula.id == peliFavs.id){
                console.log("a");
                pelicula.fav = true;
                setFav(true);
            }
        }
    }, [pelicula]);

    console.log(fav, pelicula.title);

    let favs = []
    function handleFav(e) {
        if (localStorage.getItem("favs")) {
            favs = JSON.parse(localStorage.getItem("favs"));
        }
        stopBubbling(e);
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
        let filtrado = favs.filter((p)=>{return p.id != pelicula.id})
        localStorage.setItem("favs", JSON.stringify(filtrado));
        stopBubbling(e);
        window.location.reload(false);
    }

    function stopBubbling(e){
        e.stopPropagation();
        e.cancelBubble = true;
    }

    function handleDescription(){
        let desc = '';

        if(pelicula.overview.length > 375){
            desc = pelicula.overview.slice(0, 375);
            return <p className={s.description}>{`${desc}...`}</p>
        } else {
            return <p className={s.description}>{pelicula.overview}</p>
        }
        
    }



    return (
        <div className={s.container} onClick={(e)=>{stopBubbling(e); Navigate(`/pelicula/${pelicula.id}`)}}>
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
                <p className={s.data}>{pelicula.release_date}</p>
                <div className={s.descriptionContainer}>
                    {
                        handleDescription()
                    }
                </div>
            </div>
            <div style={{ backgroundImage: "url(" + "https://image.tmdb.org/t/p/w500"+ pelicula.poster_path + ")"}} className={s.image}/>
            <div className={s.titleContainer}>
                <p className={s.title} >{pelicula.title}</p>
            </div>
        </div>
    )
}