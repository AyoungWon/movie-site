import React, {useState} from 'react';


function LeftMenu(props) {
  const [Search, setSerch] = useState('')

  const onChangeSerch = (e) => {
    setSerch(e.currentTarget.value)
  }

  const enterHandler = (e) => {
    if(e.keyCode == 13){
      searchSubmit(e)
    }
  }

  const searchSubmit = (e) => {
      let movieName = Search.replaceAll(' ', '+')
      e.preventDefault() 
      window.location.href=`movie/search/${movieName}`
  }

  return (

    <div key="favorite" style={{border: '1px solid black'}}>
      <form type='text' style={{padding: '0.5rem'}}>
        <input value={Search} 
        onKeyDown={enterHandler}
        onChange={onChangeSerch} 
        placeholder='Search'
        style={{width: '90%',border: 'none', height: '2rem'}}></input>
        <button onClick={searchSubmit}
        style={{border:'none', backgroundColor: '#fff'}}>Go</button>
      </form>
    </div>

  )
}

export default LeftMenu