import React from 'react'

function SlideCards(props) {
  if(props.landingPage){
    return (
      <li className="slide-card">
        <div className="card-wrapper">
          <a href={`/movie/${props.movieId}`}>
          <img style={{ height:'320px'}} 
          src={props.image} 
          alt={props.movieName}/>
          </a>
          {props.index ? <div className="ranking">{props.index}</div> : null}
          <div className="score">{props.score}</div> 
        </div>
        <h2 className="movie-title">{props.movieName}</h2>
    </li>
    )
  }else {
    return (
      <li className="slide-card">
        <div className="card-wrapper" style={{width:'200px'}}>
          <img style={{width:'100%', height:'240px'}} 
          src={props.image} 
          alt={props.actorName}/>
        </div>
        <h2 className="actor">{props.actorName}</h2>
        <h3 className="character">{props.characterName}역</h3>
    </li>
    )
  }
  
}

export default SlideCards
