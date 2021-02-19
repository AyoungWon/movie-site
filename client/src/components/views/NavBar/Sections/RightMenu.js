/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useState} from 'react';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";

function RightMenu(props) {
  const user = useSelector(state => state.user)


  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };


  if (user.userData && !user.userData.isAuth) {
    return (
      <ul className='navMenu'>

        <li  >
          <a href="/login">Signin</a>
        </li>
        <li >
          <a href="/register">Signup</a>
        </li>
      </ul>
    )
  } else {
    return (
      <ul className='navMenu' >
        <li key="favorite">
          <a href="/favorite">Favorite</a>
        </li>
        <li key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </li>
      </ul>
    )
  }
}

export default withRouter(RightMenu);

