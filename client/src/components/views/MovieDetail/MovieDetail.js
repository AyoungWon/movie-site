import React, { useEffect, useState, Fragment } from 'react'
import { Row} from 'antd';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config'
import GridCards from '../Commons/GridCards'
import SlideCards from '../Commons/SlideCards'
import MainImage from '../../views/LandingPage/Sections/MainImage';
import Favorite from './Sections/Favorite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowDown} from '@fortawesome/free-solid-svg-icons'
import '../Commons/GridCards.css'
import './MovieDetail.css'

function MovieDetailPage(props) {

    const movieId = props.match.params.movieId
    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [TrailerKey, setTrailerKey] = useState()
    const [SimilarMovies, setSimilarMovies] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)
    const [Director, setDirector] = useState('')


useEffect(() => {

    let endpointCrew = `${API_URL}/movie/${movieId}/credits?api_key=${API_KEY}`
    let endpointInfo = `${API_URL}/movie/${movieId}?api_key=${API_KEY}&language=ko`
    let endpointTrailer = `${API_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=ko`
    let endpointSimilar = `${API_URL}/movie/${movieId}/similar?api_key=${API_KEY}&language=ko&page=1`

    fetch(endpointInfo)
      .then(response => response.json())
      .then(response => {
        console.log(response)
        setMovie(response)
      })
    fetch(endpointCrew)
      .then(response => response.json())
      .then(response => {
        let directors = [];
        response.crew.forEach(function(entry){
          if (entry.job === 'Director') {
              directors.push(entry.name);
          }
      })
        setDirector(directors[0])
        setCasts(response.cast)
      })
      fetch(endpointTrailer)
      .then(response => response.json())
      .then(response => {
        if(response.results.length > 0){
          setTrailerKey(response.results[0].key)
       }
      })
      fetch(endpointSimilar)
      .then(response => response.json())
      .then(response => {
        console.log(response)
        setSimilarMovies(response.results)
      })

  }, [])

    const toggleActorView = () => {
        setActorToggle(!ActorToggle)
    }




    return (<div>
      <MainImage
      image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
      movieInformation={Movie}
      director={Director}
      />
      <div style={{width: '75%', margin: '1rem auto'}}>
        <div style={{ display:'flex', justifyContent:'flex-end'}}>
          <Favorite 
          movieInfo={Movie} 
          movieId={movieId} 
          userFrom={localStorage.getItem('userId')}/>
        </div>
        <div className="story-wrap">
          <p id="tagline">{Movie.tagline}</p>
          <p id="overview">{Movie.overview}</p>
        </div>
        <br />
        <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
          {TrailerKey ? (
            <iframe width="854" height="480" src={`https://www.youtube.com/embed/${TrailerKey}`}
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen>
            </iframe>
          ): null}
          
        </div>
        
        <div className="slide-card-box cast-wrap">
          <h2 className="title">주요 출연진</h2>
          <hr/>
								<div className='slide-card-wrap' >
									<ul className="scroller" >
										{Casts && Casts.map((cast,index) => (
										<Fragment key={index}>
											<SlideCards
											index={index + 1}
											image={cast.profile_path ?
                        `${IMAGE_BASE_URL}w500${cast.profile_path}`: null}
                      characterName={cast.character}
                      actorName={cast.name}

											/>
										</Fragment>
											))}
									</ul>
								</div>
							</div>

        <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem'}}>
          <button id="actorViewBtn" onClick={toggleActorView}>비슷한 영화 추천 <FontAwesomeIcon icon={faArrowDown}/></button>
        </div>
        {ActorToggle &&
                <div className="grid-card-wrap">
                {SimilarMovies && SimilarMovies.map((movie,index) => (
                  <Fragment key={index}>
                    <GridCards 
                      landingPage
                      image={movie.poster_path ?
                        `${IMAGE_BASE_URL}w500${movie.poster_path}`: null}
                      movieId={movie.id}
                      movieName={movie.original_title}
                      />
                  </Fragment>
                ))}
              </div>
        }

      </div>
    </div>
    )
}
export default MovieDetailPage
