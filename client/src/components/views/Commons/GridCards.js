import React from 'react'
import {Col} from 'antd'

function GridCards(props) {

  if(props.landingPage){
    return (
      <Col lg={6} md={12} xs={12}>
        <div style={{position:'relative', maxHeight:'320px'}}>
           <a href={`/movie/${props.movieId}`}>
            <img style={{width: '100%'}} 
            src={props.image} 
            alt={props.movieName}/>
          </a>
        </div>
        
      </Col>
  
    )
  } else {
    return (
      <Col lg={6} md={8} xs={24}>
        <div style={{position:'relative'}}>
            <img style={{width: '100%', height:'320px'}} 
            src={props.image} 
            alt={props.characterName}/>
        </div>
        <p>test</p>
      </Col>
  
    )
  }

}

export default GridCards
