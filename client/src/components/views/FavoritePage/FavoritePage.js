import React, {useEffect, useState} from 'react'
import './favorite.css';
import axios from 'axios';
import { Popover } from 'antd';
import { IMAGE_BASE_URL } from '../../Config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'



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
  <div style={{ width: '75%', margin: '3rem auto' }}>
    <h2> Favorite Movies </h2>
    <hr />

    <table id="favorite-list">
        <thead>
            <tr>
                <th>Movie Title</th>
                
            </tr>
        </thead>
        <tbody>

        {Favorites.map((favorite, index) => (
          <tr key={index}>
            <td style={{display: 'flex', alignItems:'center', justifyContent:'space-between'}}>
              <a href={`/movie/${favorite.movieId}`} style={{}}>{favorite.movieTitle}</a>
              <button onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}><FontAwesomeIcon icon={faTrashAlt}/></button></td>
            
          </tr>
        ))}

            


        </tbody>
    </table>
</div>
  )
}

export default FavoritePage
