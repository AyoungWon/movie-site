import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

function SearchMenu(props) {
  const [Search, setSerch] = useState()

  const onChangeSerch = (e) => {
    setSerch(e.currentTarget.value)
  }

  const enterHandler = (e) => {
    if(e.keyCode == 13){
      searchSubmit(e)
    }
  }

  const searchSubmit = (e) => {
    e.preventDefault() 
    if(Search){
      let movieName = Search.replaceAll(' ', '+')
      window.location.href=`/movie/search/${movieName}`
    }
    
  }

  return (

    <div className="search-wrap">
      <form className="search-bar" type='text' >
        <input  
        className="search-input"
        value={Search} 
        onKeyDown={enterHandler}
        onChange={onChangeSerch} 
        placeholder='영화 검색'
        ></input>
        <button 
        className="search-btn"
        onClick={searchSubmit}
        >
          <FontAwesomeIcon icon={faSearch}/>
        </button>
      </form>
    </div>

  )
}

export default SearchMenu