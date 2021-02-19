import React, { useState, useEffect, Fragment } from 'react';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import { Drawer, Button } from 'antd';
import Icon, { AlignRightOutlined } from '@ant-design/icons'
import './Sections/Navbar.css';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config'
import GenreList from './Sections/GenreList';


function NavBar() {
  const [visible, setVisible] = useState(false)
  const [visibleTop, setvisibleTop] = useState(false)
  const [placement, setplacement] = useState('top')
  const [Genres, setGenres] = useState([])
  
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
     
        <div className="menu_left" >
          <LeftMenu/>
          <button id="category" onClick={showDrawerTop} >Category</button>
        </div>
        <div className="menu_right" >
          <RightMenu/>
        </div>
        <Button
          className="menu__mobile-button"
          type="primary"
          onClick={showDrawer}
        >
          <AlignRightOutlined />
        </Button>
        <Drawer
          title="Basic Drawer"
          placement="right"
          className="menu_drawer"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <button onClick={showDrawerTop} >Category</button>
          <RightMenu mode="inline" />
        </Drawer>
      
    </div>
    <div>
    <Drawer
          title="Genres"
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