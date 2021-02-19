
import React, {useState, useEffect} from 'react'
function MovieInfo(props) {
  

let {movieInformation} = props



/*   let {movieInformation} = props
  console.log(movieInformation) */

  return (
    <div className="detail-wrap">
   
      <div className="story-wrap">
        <p id="tagline">{movieInformation.tagline}</p>
        <p id="overview">{movieInformation.overview}</p>
      </div>
      
    </div>

  )
}

export default MovieInfo
