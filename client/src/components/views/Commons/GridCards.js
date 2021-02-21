import React from 'react'
import './GridCards.css'


function GridCards(props) {

  if(props.landingPage){
    return (

        <div className="card">
           <a href={`/movie/${props.movieId}`}>
            <img style={{width:'100%', height:'100%'}} 
            src={props.image} 
            alt={props.movieName}/>
          </a>
        </div>
        
    )
  } 

}

export default GridCards
