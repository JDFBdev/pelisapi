import React, {useState, useEffect} from "react"
import { useNavigate } from 'react-router-dom'
import { useParams } from "react-router-dom";
import axios from "axios"
let apiKey = '9606b913162ebfc8b1e68fc22f824e10';

export default function Pelicula(){
    let params = useParams();
    const[pelicula, setPelicula] = useState({});
    const Navigate = useNavigate();

    useEffect(async () => {
        let promise = await axios.get(`https://api.themoviedb.org/3/movie/${params.id}}?api_key=${apiKey}&language=en-US`)
        let response = promise.data;
        setPelicula(response);
    }, []);
  
    return (
        <div>
            <button onClick={()=>Navigate("/")}> Go Back </button> 
            <h1>{pelicula.title}</h1>
            <div>
                <p>{pelicula.release_date}</p>
                <p>{pelicula.vote_average}</p>
                <p>{pelicula.runtime}</p>
            </div>
            <img src={pelicula.poster_path}></img>
            <p>{pelicula.overview}</p>s
        </div>
    )
}