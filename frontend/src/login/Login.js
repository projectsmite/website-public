import React, {useState} from 'react'
import UseLocalStorage from 'use-local-storage'
import '../login/Login.css'
import * as Icon from 'react-bootstrap-icons';
import Userfront from '@userfront/react'
import { useNavigate } from "react-router-dom";

Userfront.init("placeholder");

function Loginpage() {
  const [loginUsername, setLoginUsername] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [theme, setTheme] = UseLocalStorage('theme' ? 'dark' : 'light')

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme)
  }
  function login(e) {
    // Prevent the form's default behavior
    e.preventDefault();
    // Call Userfront.login()
    Userfront.login({
      method: "password",
      emailOrUsername: loginUsername,
      password: loginPassword,
    }).catch(function(error) {
      alert(error.message);
    });
  }

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/`; 
    navigate(path);
  }
  return (
    <div className="loginpage">
    <h2>Login</h2>
    <a>
      <Icon.ArrowReturnLeft onClick={routeChange} id='' color='white' />
    </a>
    

    <form >
      <div className="user-box">
        <input onChange={(e) => {setLoginUsername(e.target.value)}} type="text"  />
        <label>Username</label>
      </div>
      <div className="user-box">
        <input onChange={(e) => {setLoginPassword(e.target.value)}} type="password" />
        <label>Password</label>
      </div>
      <a type='button' onClick={login} href="#">
        <span />
        <span />
        <span />
        <span />
        Submit
      </a>
    </form>
  </div>
  );
}

export default Loginpage;