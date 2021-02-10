import React, {useEffect, useState, Fragment} from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from '../LandingPage/Sections/MainImage';
import MovieInfo from './Sections/MovieInfo';
import GridCard from '../Commons/GridCard'
import {Row} from 'antd'
import { withRouter } from 'react-router-dom'

function MovieDetail(props) {
let movieId = props.match.params.movieId
console.log(props.match)
const [Movie, setMovie] = useState([])
const [Casts, setCasts] = useState([])
const [ActorToggle, setActorToggle] = useState(false)

  useEffect(() => {

    let endpointCrew = `${API_URL}/movie/${movieId}/credits?api_key=${API_KEY}`
    let endpointInfo = `${API_URL}/movie/${movieId}?api_key=${API_KEY}`

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
  }, [])

  const toggleActprView = () => {
    setActorToggle(!ActorToggle)
  }

  return (
    <div>
      <MainImage
      image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
      title={Movie.original_title}
      text={Movie.overview}
      />
      <div style={{width: '85%', margin: '1rem auto'}}>
        <div style={{ display:'flex', justifyContent:'flex-end'}}>
          <button>Favorite</button>
        </div>
        <MovieInfo
        movieInformation={Movie}
        />
        <br />
        <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem'}}>
          <button onClick={toggleActprView}> Toggle Actor View</button>
        </div>
        {ActorToggle &&
                <Row gutter={[16,16]}>
                {Casts && Casts.map((cast,index) => (
                  <React.Fragment key={index}>
                    <GridCard 
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

export default withRouter(MovieDetail)