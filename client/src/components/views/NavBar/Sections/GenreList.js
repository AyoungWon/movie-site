import React from 'react'

function GenreList(props) {
  return (
    <li 
    style={{width: '33%'}}
    value={props.genre.id}>
      <a href={`/movie/discover/${props.genre.id}`}>{props.genre.name}</a>
      
    </li>
  )
}

export default GenreList
