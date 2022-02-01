import React, {useState} from "react"
import axios from "axios"
let apiKey = '6d022ee2';

export default function Buscador({titulo}){
    const[input, setInput] = useState('');
    const[peliculas, setPeliculas] = useState([]);

    const handleInput = function(e){
      setInput(e.target.value);
    }

    const handleSubmit = async function(e){
        e.preventDefault()
        let promise = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&s=${input}`)
        let response = promise.data;
        setPeliculas(response.Search);
    }
  
    return (
        <div>
            <input name='input' onChange={handleInput} ></input>
            <button  onClick={handleSubmit}>Submit</button>
            {
                peliculas?.map((p)=>{
                    return <p>{p.Title}</p>
                })
            }
        </div>
    )
}