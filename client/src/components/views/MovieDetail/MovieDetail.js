import React, { useEffect, useState } from 'react'
import { List, Avatar, Row, Col, Button } from 'antd';


import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config'
import GridCards from '../Commons/GridCards'
import MainImage from '../../views/LandingPage/Sections/MainImage';
import MovieInfo from './Sections/MovieInfo';
import Favorite from './Sections/Favorite';
function MovieDetailPage(props) {

    const movieId = props.match.params.movieId
    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [TrailerKey, setTrailerKey] = useState()
    const [ActorToggle, setActorToggle] = useState(false)


useEffect(() => {
    console.log(localStorage.getItem('userId'))
    let endpointCrew = `${API_URL}/movie/${movieId}/credits?api_key=${API_KEY}`
    let endpointInfo = `${API_URL}/movie/${movieId}?api_key=${API_KEY}&language=ko`
    let endpointTrailer = `${API_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=ko`

    fetch(endpointInfo)
      .then(response => response.json())
      .then(response => {
        console.log(response)
        setMovie(response)
      })
    fetch(endpointCrew)
      .then(response => response.json())
      .then(response => {
        console.log("crew", response)
        setCasts(response.cast)
      })
      fetch(endpointTrailer)
      .then(response => response.json())
      .then(response => {
        setTrailerKey(response.results[0].key)
        
      })

  }, [])

    const toggleActorView = () => {
        setActorToggle(!ActorToggle)
    }




    return (<div>
      <MainImage
      image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
      title={Movie.title}
      text={Movie.overview}
      />
      <div style={{width: '85%', margin: '1rem auto'}}>
        <div style={{ display:'flex', justifyContent:'flex-end'}}>
          <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')}/>
        </div>
        <MovieInfo
        movieInformation={Movie}
        />
        <br />
        <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
          <iframe width="854" height="480" src={`https://www.youtube.com/embed/${TrailerKey}`}
          
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
          </iframe>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem'}}>
          <button onClick={toggleActorView}> Toggle Actor View</button>
        </div>
        {ActorToggle &&
                <Row gutter={[16,16]}>
                {Casts && Casts.map((cast,index) => (
                  <React.Fragment key={index}>
                    <GridCards 
                      image={cast.profile_path ?
                        `${IMAGE_BASE_URL}w500${cast.profile_path}`: null}
                      characterName={cast.name}
                      />
                  </React.Fragment>
                ))}
              </Row>
        }

      </div>
    </div>
    )
}

export default MovieDetailPage

