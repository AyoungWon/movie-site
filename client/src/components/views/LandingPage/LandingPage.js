import React,{useEffect, useState, Fragment} from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from '../Commons/MainImage';
import { withRouter } from 'react-router-dom'
import SlideCards from '../Commons/SlideCards';
import '../Commons/GridCards.css'


function LandingPage() {
	const [Movies, setMovies] = useState([])
	const [MainMovieImage, setMainMovieImage] = useState(null)
	const [PlayingMovie, setPlayingMovie] = useState([])
	const [HotMovies, setHotMovies] = useState([])
	

	useEffect(() => {
		const endpointHot = `${API_URL}/trending/movie/week?api_key=${API_KEY}&&language=ko&page=1`;
		const endpointPlaying = `${API_URL}/movie/now_playing?api_key=${API_KEY}&&language=ko&page=1&region=KR`
		fetchMoviesHot(endpointHot)
		fetchMoviesPlaying(endpointPlaying)
	}, [])

	const fetchMoviesPlaying = (endpoint) => {
		fetch(endpoint)
		.then(response => response.json())
		.then(response => {
			setPlayingMovie([...response.results])
		})
	}

	const fetchMoviesHot = (endpoint) => {
		fetch(endpoint)
		.then(response => response.json())
		.then(response => {
			setMainMovieImage(response.results[0])
			setHotMovies([...HotMovies,...response.results])
		})
	}

    return (
			<div style={{width: '100%', margin: '0'}}>
				{MainMovieImage && <MainImage 
				landingPage
				image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
				title={MainMovieImage.original_title}
				text={MainMovieImage.overview}/>
				}
				<div style={{ width : '85%', margin: '1rem auto'}}>	
					<div className="section" style={{marginTop: '50px'}}>
						<h2>현재상영작</h2>
						<hr/>
							<div className="slide-card-box">
								<div className='slide-card-wrap' >
									<ul className="scroller" >
										{PlayingMovie && PlayingMovie.map((movie,index) => (
										<Fragment key={index}>
											<SlideCards
											landingPage
											index={index + 1}
											image={movie.poster_path ?
											`${IMAGE_BASE_URL}w300${movie.poster_path}`: null}
											movieId={movie.id}
											movieName={movie.title}
											score={movie.vote_average}
											/>
										</Fragment>
											))}
									</ul>
								</div>
							</div>
					</div>

						<div className="section" style={{marginTop: '50px'}}>
							<h2>Weekly Hot</h2>
							<hr/>
							<div className="slide-card-box">
								<div className='slide-card-wrap' >
									<ul className="scroller" >
										{HotMovies && HotMovies.map((movie,index) => (
										<Fragment key={index}>
											<SlideCards
											landingPage
											index={index + 1}
											image={movie.poster_path ?
											`${IMAGE_BASE_URL}w300${movie.poster_path}`: null}
											movieId={movie.id}
											movieName={movie.original_title}
											score={movie.vote_average}
											/>
										</Fragment>
											))}
									</ul>
								</div>
							</div>
						</div>
					</div>
        </div>
    )
}

export default withRouter(LandingPage)
