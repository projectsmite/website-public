
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';  
import {Container ,Card, CardGroup, } from 'react-bootstrap';
import img from '../images/pack.png'
import Sidebar from './sidebar/sidebar';

export default function Home() {
  return(
    <>
    <Sidebar />
    <div>
      <h2>Home</h2>
      <div>
        <img
          src={img}
          alt="Smite Logo"
          style={{ width: '10%' }}
        /> 
        SMITE Device 
      </div>
    </div>
    </>
  ) 
}