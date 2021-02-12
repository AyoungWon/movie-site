import React from 'react'
import {Descriptions} from 'antd'
function MovieInfo(props) {

  let {movieInformation} = props

  return (
    <Descriptions title="Movie Info" bordered>
      <Descriptions.item label="Title">{movieInformation.original_title}</Descriptions.item>
      <Descriptions.item label="release_date">{movieInformation.release_date}</Descriptions.item>
      <Descriptions.item label="revenue">{movieInformation.revenue}</Descriptions.item>
      <Descriptions.item label="runtime">{movieInformation.runtime}</Descriptions.item>
      <Descriptions.item label="vote_average" span={2}>{movieInformation.vote_average}</Descriptions.item>
      <Descriptions.item label="vote_count">{movieInformation.vote_count}</Descriptions.item>
      <Descriptions.item label="status">{movieInformation.status}</Descriptions.item>
      <Descriptions.item label="popularity">{movieInformation.popularity}</Descriptions.item>

    </Descriptions>
  )
}

export default MovieInfo
