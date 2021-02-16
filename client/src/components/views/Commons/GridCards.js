import React from 'react'
import {Col} from 'antd'

function GridCards(props) {

  if(props.landingPage){
    return (
      <Col lg={6} md={12} xs={12}>
        <div style={{position:'relative'}}>
           <a href={`/movie/${props.movieId}`}>
            <img style={{width: '100%',  height:'320px'}} 
            src={props.image} 
            alt={props.movieName}/>
          </a>
          {props.index ? <div className="ranking" style={{
            position:'absolute', 
            top:' 0', 
            left: '0', 
            width: '50px', 
            height:'50px', 
            display: 'flex',
            alignItems:'center',
            justifyContent:'center',
            color: '#000',
            backgroundColor:'rgba(255, 255, 255, 0.5)',
            fontSize: '1.5rem'
            

            }}>{props.index}</div> : null}
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
