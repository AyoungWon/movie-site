import React, { useState, useEffect, Fragment } from 'react';
import SearchMenu from './Sections/SearchMenu';
import RightMenu from './Sections/RightMenu';
import { Drawer} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBars} from '@fortawesome/free-solid-svg-icons'
import './Sections/Navbar.css';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config'
import GenreList from './Sections/GenreList';


function NavBar() {
  const [visible, setVisible] = useState(false)
  const [visibleTop, setvisibleTop] = useState(false)
  const [placement, setplacement] = useState('top')
  const [Genres, setGenres] = useState([])
  const [CategoryVisible, setCategoryVisible] = useState(false)
  
  useEffect(() => {
    const genreList = `${API_URL}/genre/movie/list?api_key=${API_KEY}&language=ko`
    fetch(genreList)
    .then(response => response.json())
    .then(response => {
      setGenres([...response.genres])
    })
  }, [])

  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };
  const showDrawerTop = () => {
    setvisibleTop(true)
  };

  const onCloseTop = () => {
    setvisibleTop(false)
  };

  const onClickCategory = () => {
    setCategoryVisible(!CategoryVisible)
  }

  return (
    <nav >
    <div className="menu">
      <div className="menu__logo" >
        <a href="/"  >
          <div>
          <img src="/img/popcorn.png" />
          </div>
         
        <h1>Movie Pop</h1>
        </a>
      </div>
        <div className="menu_search" >
          <SearchMenu/>
          <button id="category" onClick={showDrawerTop} >Category</button>
        </div>
        <div className="menu_right" >
          <RightMenu/>
        </div>
        <button
          className="menu-btn-mobile"
          type="primary"
          onClick={showDrawer}
        >
          <FontAwesomeIcon icon={faBars}/>
        </button>
        <Drawer
          title="Menu"
          placement="right"
          className="menu_drawer"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <RightMenu mode="inline" />
          <SearchMenu/>
          <button id="categoryBtn" onClick={onClickCategory}>Category</button>
          {CategoryVisible ? (
          <ul id="mobile-category">
            {Genres.map((genre, index)=> (
              <Fragment key={index}>
                <GenreList genre={genre}/>
              </Fragment>
            ))}
          </ul>) : null}
          
        </Drawer>
      
    </div>
    <div className="genre-catecory">
    <Drawer
          title="Category"
          placement={placement}
          closable={false}
          onClose={onCloseTop}
          visible={visibleTop}
          key={placement}
        >
          <ul style={{display: 'flex', flexWrap: 'wrap'}}>
            {Genres.map((genre, index)=> (
              <Fragment key={index}>
                <GenreList genre={genre}/>
              </Fragment>
            ))}
          </ul>
        </Drawer>
    </div>
    </nav>
    
  )
}

export default NavBar