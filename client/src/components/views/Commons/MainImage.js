import React, {useState, useEffect} from 'react'

function MainImage (props) {
  const [Genre, setGenre] = useState("")
  let {movieInformation} = props
  useEffect(() => {
    if(!props.landingPage && movieInformation.genres){
      let movieGenres = movieInformation.genres
      let genreNames = []
      movieGenres.map((genre, index)=> {
        genreNames.push(genre.name)
      })
      let genreList = genreNames.join('/')
      setGenre(genreList)

    }
}, [props])

if(props.landingPage) {
  return(
    <div style={{backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 39%, rgba(0,0,0,0.3) 61%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,1) 100%), url(${props.image})`,
      height: '500px',
      backgroundSize: '100% 100%',
      backgroundPosition: 'center top',
      backgroundRepeat: 'no-repeat',
      width: '100%',
      position: 'relative'
    } }>
      {props.title ? (<div>
        <div style={{ position:'absolute', bottom:'4rem', left: '50%', transform: 'translate(-50%,0)' ,textAlign: 'center'}}>
          <h3 style={{marginBottom:'0', fontSize:'1.5rem', fontWeight: 'bold', color:'#ffbe44'}}>이번주 HOT한 영화 1위</h3>
          <h2 style={{ color: '#fff' , fontSize: '4rem', width: '100%', marginBottom:'0', textAlign: 'center'}}>{props.title}</h2>
     {/*      <p style={{ color: 'white', fontSize: '1rem'}}>{props.text}</p> */}
        </div>
      </div>): null}
      
    </div>

  )
} else{
  return(
    <div style={{backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 39%, rgba(0,0,0,0.3) 61%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,1) 100%), url(${props.image})`,
      height: '500px',
      backgroundSize: '100% 100%',
      backgroundPosition: 'center top',
      backgroundRepeat: 'no-repeat',
      width: '100%',
      position: 'relative'
    } }>
      <div className="desc-wrap" style={{}}>
        <h4><span className="title">감독:</span> <span className="desc">{props.director}</span></h4>
        <h4><span className="title">장르:</span> <span className="desc">{Genre}</span></h4>
        <h4><span className="title">출시일:</span> <span className="desc">{movieInformation.release_date}</span></h4>
        <h4><span className="title">평점:</span> <span className="desc">{movieInformation.vote_average}</span></h4>
      </div>
    </div>

  )
}
  

}

export default MainImage