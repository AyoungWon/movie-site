import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart,  faHeartBroken} from '@fortawesome/free-solid-svg-icons'

function Favorite(props) {
const movieId = props.movieId
const userFrom = props.userFrom
const movieTitle = props.movieInfo.title
const moviePost = props.movieInfo.backdrop_path
const movieRunTime = props.movieInfo.runtime

const [FavoriteNumber, setFavoriteNumber] = useState(0)
const [Favorited, setFavorited] = useState(false)

let variables = {
  userFrom: userFrom,
  movieId: movieId,
  movieTitle: movieTitle,
  moviePost: moviePost,
  movieRunTime: movieRunTime
}
  useEffect(() => {

   
    axios.post('/api/favorite/favoriteNumber', variables)
    .then(response => {
      if(response.data.success){
        console.log(response.data)
        setFavoriteNumber(response.data.favoriteNumber)
      }else {
        alert('숫자 정보를 가져오는데 실패헸습니다.')
      }
    })
    axios.post('/api/favorite/favorited', variables)
    .then(response => {
      if(response.data.success){
        console.log('favorited', response.data)
        setFavorited(response.data.favorited)
      }else {
        alert('정보를 가져오는데 실패헸습니다.')
      }
    })
  }, [])

  const onClickFavorite = () => {
    if(Favorited){
      axios.post('/api/favorite/removeFromFavorite', variables)
      .then(response => {
        console.log(response.data)
        if(response.data.success){
          setFavoriteNumber(FavoriteNumber - 1)
          setFavorited(!Favorited)
        }else {
          alert('favorite list를 지우는데  실패헸습니다.')
        }
      })
    } else {
      axios.post('/api/favorite/addToFavorite', variables)
      .then(response => {
        if(response.data.success){
          setFavoriteNumber(FavoriteNumber + 1)
          setFavorited(!Favorited)
        }else {
          alert('favorite list를 추가하는데 실패헸습니다.')
        }
      })  
    }
  }
  return (
    <div>
      <button id="favoriteBtn" onClick={onClickFavorite}>
        {Favorited ? <FontAwesomeIcon icon={faHeartBroken}/> : <FontAwesomeIcon icon={faHeart}/>} {FavoriteNumber}
        </button>
    </div>
  )
}

export default Favorite
