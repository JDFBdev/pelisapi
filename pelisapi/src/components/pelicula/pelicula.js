import React, {useState, useEffect} from "react"
import { useNavigate } from 'react-router-dom'
import { useParams } from "react-router-dom";
import axios from "axios"
let apiKey = '6d022ee2';

export default function Pelicula(){
    let params = useParams();
    const[pelicula, setPelicula] = useState({});
    const Navigate = useNavigate();

    useEffect(async () => {
        let promise = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&i=${params.imdbID}`)
        let response = promise.data;
        setPelicula(response);
    }, []);
  
    return (
        <div>
            <button onClick={()=>Navigate("/")}> Go Back </button> 
            <h1>{pelicula.Title}</h1>
            <div>
                <p>{pelicula.Year}</p>
                <p>{pelicula.Rated}</p>
                <p>{pelicula.Runtime}</p>
            </div>
            <img src={pelicula.Poster}></img>
            <p>{pelicula.Plot}</p>
            <p>{pelicula.Director}</p>
        </div>
    )
}