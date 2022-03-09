import React, {useState, useEffect} from "react"
import s from "./card.module.css"
import { useNavigate } from "react-router-dom";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa"
import toast from "react-hot-toast";

export default function Card({pelicula, color10, setSelected, open}) {

    const Navigate = useNavigate();
    const url = window.location.href.slice(21);
    const [fav, setFav] = useState(false);

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
    }, );

    useEffect(() => {
        setFav(false);
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
    }, [pelicula]);

    let favs = []
    function handleFav(e) {
        if (localStorage.getItem("favs")) {
            favs = JSON.parse(localStorage.getItem("favs"));
        }
        stopBubbling(e);
        if (fav) {
            toast.error("Already in Favorites")
        } else {
            favs.push(pelicula);
            localStorage.setItem("favs", JSON.stringify(favs));
            toast.success("Added to Favorites");
            setFav(true);
        }
    }

    function handleRemoveFav(e) {
        if (localStorage.getItem("favs")) {
            favs = JSON.parse(localStorage.getItem("favs"));
        }
        let filtrado = favs.filter((p)=>{return p.id !== pelicula.id})
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

    function handleRating() {
        let rating = Number(Math.floor(pelicula.vote_average));
        let color;
        switch (rating) {
            case 1: case 2: case 3:
                color = "red";
                break;
            case 4: case 5: case 6:
                color = "yellow";
                break;
            case 7: case 8: case 9:
                color = "rgb(71, 209, 36)";
                break;
            case 10:
                color = `rgb(${color10.r},${color10.g},${color10.b})`;
            default:
                
        }
        return <h1 style={{color : color, transition: "color 2s ease", WebkitTransition: "color 2s ease", MozTransition: "color 2s ease"}} className={s.rating}>{pelicula.vote_average}</h1>
    }

    return (
        <div className={s.container} onClick={(e)=>{stopBubbling(e); setSelected(pelicula); open()}}>
            {
                (url === '/' && fav) &&
                <div className={s.favContainer}><AiFillStar className={s.fav}/></div>    
            }
            {
                (url === '/' && !fav) &&
                <div className={s.favContainer}><AiOutlineStar onClick={handleFav} className={s.fav}/></div>    
            }
            {
                url === '/favs' && 
                <div className={s.favContainer}><FaRegTrashAlt  onClick={handleRemoveFav} className={s.fav}/></div>
            }
            <div className={s.info}>
                {handleRating()}
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