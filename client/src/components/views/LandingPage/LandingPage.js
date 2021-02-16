import React,{useEffect, useState, Fragment} from 'react'
import { FaCode } from "react-icons/fa";
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from './Sections/MainImage';
import GridCards from '../Commons/GridCards'
import {Row, Carousel} from 'antd'
import { withRouter } from 'react-router-dom'


function LandingPage() {

	const [Movies, setMovies] = useState([])
	const [MainMovieImage, setMainMovieImage] = useState(null)
	const [CurrentPage, setCurrentPage] = useState(0)
	const [PlayingMovie1, setPlayingMovie1] = useState([])
	const [PlayingMovie2, setPlayingMovie2] = useState([])
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
			const movies1 = response.results.slice(0,4)
			const movies2 = response.results.slice(4,8)
			return [movies1, movies2]
		})
		.then(response => {
			setPlayingMovie1([...response[0]])
			setPlayingMovie2([...response[1]])
		}
			
		)
	}

	const fetchMoviesHot = (endpoint) => {
		fetch(endpoint)
		.then(response => response.json())
		.then(response => {
			setMainMovieImage(response.results[0])
			setHotMovies([...HotMovies,...response.results])
			setCurrentPage(response.page)
		})
	}

	const loadMoreItem = () => {
		const endpoint = 	`${API_URL}/trending/movie/week?api_key=${API_KEY}&&language=en-US&page=${CurrentPage + 1}`
		fetchMoviesHot(endpoint)
	}
    return (
			<div style={{width: '100%', margin: '0'}}>
				{MainMovieImage && <MainImage 
				image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
				title={MainMovieImage.original_title}
				text={MainMovieImage.overview}/>
				}
				<div style={{ width : '85%', margin: '1rem auto'}}>	
					<div>
						<h2>Movies by latest</h2>
						<hr/>
						<Carousel  autoplay>
							<div >
								<div className='card-wrap' style={{display: 'flex'}}>
									<div>
										<Row gutter={[2,2]}>
											{PlayingMovie1 && PlayingMovie1.map((movie,index) => (
											<Fragment key={index}>
											<GridCards 
											landingPage
											index={index + 1}
											image={movie.poster_path ?
											`${IMAGE_BASE_URL}w300${movie.poster_path}`: null}
											movieId={movie.id}
											movieName={movie.original_title}
											/>
											</Fragment>
											))}
										</Row>
									</div>
								</div>
							</div>

							<div >
								<div className='card-wrap' style={{display: 'flex'}}>
									<div>
										<Row gutter={[2,2]}>
											{PlayingMovie2 && PlayingMovie2.map((movie,index) => (
											<Fragment key={index}>
											<GridCards 
											index={index + 5}
											landingPage
											image={movie.poster_path ?
											`${IMAGE_BASE_URL}w300${movie.poster_path}`: null}
											movieId={movie.id}
											movieName={movie.original_title}
											/>
											</Fragment>
											))}
										</Row>
									</div>
								</div>
							</div>
						</Carousel>
						<div>
							<h2>Weekly Hot</h2>
							<hr/>
							<Row gutter={[16,16]}>
								{HotMovies && HotMovies.map((movie,index) => (
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
							</Row>
							<div style={{ display: 'flex', justifyContent: 'center'}}>
							<button onClick={loadMoreItem}>Load More</button>
							</div>
						</div>
					</div>					
					</div>
					
        </div>
    )
}

export default withRouter(LandingPage)
