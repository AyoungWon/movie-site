import React, {useEffect, useState} from 'react'
import './favorite.css';
import axios from 'axios';
import { Popover } from 'antd';
import { IMAGE_BASE_URL } from '../../Config';



function FavoritePage() {
  const [Favorites, setFavorites] = useState([])

  useEffect(() => {
    fetchFavorite()
  }, [])

  const fetchFavorite = () => {
    axios.post('/api/favorite/getFavoritedMovie', {userFrom: localStorage.getItem('userId')})
    .then(response => {
      if( response.data.success){
        console.log(response.data.favorites)
        setFavorites(response.data.favorites)
      }else {
        alert('영화 정보 로드 실패')
      }
    })
  }

  const onClickDelete = (movieId, userFrom) => {
    const value = {
      movieId,
      userFrom
    }
    axios.post('/api/favorite/removeFromFavorite', value)
    .then(response=> {
      if(response.data.success){
        fetchFavorite()
      }else {
        alert('remove failed')
      }
    })
  }
  return (
  <div style={{ width: '85%', margin: '3rem auto' }}>
    <h2> Favorite Movies </h2>
    <hr />

    <table>
        <thead>
            <tr>
                <th>Movie Title</th>
                <th>Movie RunTime</th>
                <td>Remove from favorites</td>
            </tr>
        </thead>
        <tbody>

        {Favorites.map((favorite, index) => (
          <tr key={index}>
            <td>{favorite.movieTitle}</td>
            <td>{favorite.movieRunTime}</td>
            <td><button onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}>Remove</button></td>
          </tr>
        ))}

            


        </tbody>
    </table>
</div>
  )
}

export default FavoritePage
