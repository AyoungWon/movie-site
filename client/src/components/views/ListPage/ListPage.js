import React,{useState, useEffect, Fragment} from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config'
import GridCards from '../Commons/GridCards'
import {Row,} from 'antd'
import '../Commons/GridCards.css'


function ListPage(props) {
  const movieName = props.match.params.movieName
  const movieGenre = props.match.params.genre
  const [Movies, setMovies] = useState([])
  const [PageNumber, setPageNumber] = useState(0)
  const [CurrentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    if(movieName) {
      const endpoint = `${API_URL}/search/movie?api_key=${API_KEY}&query=${movieName}&language=ko`
      fetchMovie(endpoint)
    } else {
      const endpoint = `${API_URL}/discover/movie?api_key=${API_KEY}&language=ko&region=KR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${movieGenre}`
      fetchMovie(endpoint)
    }
    
  }, [])

  const fetchMovie = (endpoint) => {
    fetch(endpoint)
    .then(response => response.json())
    .then(response => {
      console.log(response)
      setPageNumber(response.total_pages)
      setMovies([...Movies,...response.results])
      setCurrentPage(CurrentPage + 1)
    })
  }
  const loadMoreItem = () => {
    if(movieName){
      const endpoint = 	`${API_URL}/search/movie?api_key=${API_KEY}&query=${movieName}&language=ko&page=${CurrentPage + 1}`
		  fetchMovie(endpoint)
    }else {
      const endpoint = `${API_URL}/discover/movie?api_key=${API_KEY}&language=ko&region=KR&sort_by=popularity.desc&include_adult=false&include_video=false&page=${CurrentPage + 1}&with_genres=${movieGenre}`
      fetchMovie(endpoint)
    }
		
	}
  return (
    <div style={{ width : '85%', margin: '1rem auto'}}>
      <div className="grid-card-wrap">
        {Movies && Movies.map((movie,index) => (
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
      {PageNumber > 1 ? (<div style={{ display: 'flex', justifyContent: 'center'}}>
        <button onClick={loadMoreItem}>Load More</button>
      </div>) : null}
      
    </div>
  )
}

export default ListPage
