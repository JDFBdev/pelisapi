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
    const [counter, setCounter] = useState(6);
    const [color10,setColor] = useState({r:173, g:0, b: 0})

    useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
        counter === 0 && setCounter(6)
        if (counter === 6){
            setColor({r:173, g: 0, b:0})
        }
        if (counter === 5){
            setColor({r:173, g: 173, b:0})
        }
        if (counter === 4){
            setColor({r:0, g: 173, b:0})
        }
        if (counter === 3){
            setColor({r:0, g: 173, b:173})
        }
        if (counter === 2){
            setColor({r:0, g: 0, b:173})
        }
        if (counter === 1){
            setColor({r:173, g: 0, b:173})
        }

    }, [counter]);

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
            if (pelicula.id == peliFavs.id){
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
                
        }
        return <h1 style={{color : color, transition: "color 2s ease", WebkitTransition: "color 2s ease", MozTransition: "color 2s ease"}} className={s.rating}>{pelicula.vote_average}</h1>
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