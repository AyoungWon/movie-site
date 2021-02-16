import React, { useState } from 'react';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import { Drawer, Button } from 'antd';
import Icon, { AlignRightOutlined } from '@ant-design/icons'
import './Sections/Navbar.css';

function NavBar() {
  const [visible, setVisible] = useState(false)
  const [visibleTop, setvisibleTop] = useState(false)
  const [placement, setplacement] = useState('top')

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
    <nav style={{position: 'fixed', zIndex: 5, width: '100%'}}>
    <div className="menu" style={{ width:'100%', display:'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div className="menu__logo">
        <a href="/">Logo</a>
      </div>
      <div className="menu__container" style={{width:'90%',display: 'flex', alignItems:'center', justifyContent: 'space-around'}}>
      <button id="category" onClick={showDrawerTop} >Category</button>
        <div className="menu_left" style={{minWidth: '60%'}}>
          <LeftMenu/>
        </div>
        
        <div className="menu_right" style={{width: '20%'}}>
 
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
    </div>
    <div>
    <Drawer
          title="Basic Drawer"
          placement={placement}
          closable={false}
          onClose={onCloseTop}
          visible={visibleTop}
          key={placement}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
    </div>
    </nav>
    
  )
}

export default NavBar