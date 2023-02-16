import Spline from '@splinetool/react-spline';
import styled from "styled-components";
import './homepage.css'
import {Routes, Route, useNavigate} from 'react-router-dom';
import Userfront from "@userfront/react"
import rfidlogo from '../images/rfid-logo.png'
import irlogo from '../images/ir-logo.png'
import cameralogo from '../images/camera-logo.png'
import smitelogo from '../images/Smitelogo.png'
import React, {useState, useEffect } from 'react'

export default function Homepage() {
  const navigate = useNavigate();
  const navigateLogin = () => {
    navigate('/Login');
  };

  const navigateDashboard = () => {
    navigate('/home')
  }


  const [splinetype, setSpline] = useState(<Spline  scene='https://prod.spline.design/ZaoIJmmVYodBH9Un/scene.splinecode' /> );

  useEffect(() => {
    function handleResize() {
      console.log('resized to: ', window.innerWidth, 'x', window.innerHeight)
      if (window.innerWidth > 700) {
        //If width wider than 700px, use another spline where it is nearer to the rightside
        setSpline(<Spline  scene='https://prod.spline.design/8T-otRF0OqlaeuVn/scene.splinecode' /> )
        console.log('spline has been set')
      }
    }
    window.addEventListener('resize', handleResize)
  });
  return (
    <div id='main' className='container-fluid d-flex justify-content-center'>  
          {/* <video className='' loop autoPlay muted id="bg-video">
          <source src={videobackground} />
        </video > */}
      <div className=''> 
      <div>
      <div id='textblock' style={{ zIndex:'0',position:'absolute'}} className=''>
        <h1 className='' style={{marginTop:'10vh',marginLeft:'5vw',textAlign:'left'}}>The Swiss Army Knife Of <h1 style={{color:'rgb(71, 130, 193)'}} className='display-2'>Hacking.</h1></h1>
        <p style={{float:'left', marginTop:'1vh' ,marginLeft:'5vw',width:'auto' ,maxWidth:'30%',textAlign:'left'}}>Project Smite aims to showcase some of the
         capabilities and use cases of the SMITE Device. 
        This device offers efficiency and discreteness coupled
         with endless possiblities, all within the size of your palm. </p>
      </div>
      <div id='spline' className='' style={{position:'relative',marginBottom:'1vh',minHeight:'400px',height:'50vh' ,width:'100%'}}>
        <Spline  scene='https://prod.spline.design/ZaoIJmmVYodBH9Un/scene.splinecode' /> 
        {/* {splinetype} */}
      </div>
     
      <img id='smitelogo' alt="Smite logo" src={smitelogo}/>
      <Content> 
        
        {!Userfront.tokens.accessToken?
          <button id='login' onClick={navigateLogin}>Login</button> :
          <>
          <button id='login'  onClick={navigateDashboard}>Dashboard</button>  
          </>
        }  
        {/* <h1>Introducing the Raspberry Pi Zero 2W</h1> */}
      </Content>
      </div>
      <div id='first-half' className=''>  
        <div className='row justify-content-center'>
        <h1 className=''>Main Features</h1>
          <div id='rfid-col' class="col ">  
          <img
          id='img1'
          src={rfidlogo}
          alt="rfid image"
          style={{width: 'auto', height:'auto', maxHeight:'300px',maxWidth:'300px' }}
        /> 
            <h3>RFID Hacking</h3> 
            <h5 className="mb-2 text-muted">Uses PN532 RFID/NFC Module</h5> 
            <p>  
            Radio Frequency Identification uses electromagnetic fields to identify and track tags. This function
            can be used to Identify card types, Save card information, emulate card data, and clone cards.
            </p>   
          </div>  
          <div id='ir-col' class="col ">  
          <img
          src={irlogo}
          alt="Infrared image"
          style={{ width: 'auto', height:'auto', maxHeight:'300px',maxWidth:'300px' }}
        /> 
            <h3>Infrared Hacking</h3>  
            <h5 className="mb-2 text-muted">Uses KY-022 Receiver & KY-005 Transmitter</h5> 
            <p>  
            Uses light waves to send signals. Pulses of infrared light corresponds to binary code.
            This function is able to recieve and transmit infrared signals from the device.
            </p>  
          </div>  
          <div id='camera-col' class="col ">  
          <img
          src={cameralogo}
          alt="Camera image"
          style={{ width: 'auto', height:'auto', maxHeight:'300px',maxWidth:'300px' }}
        /> 
            <h3>Camera Feed</h3> 
            <h5 className="mb-2 text-muted">Uses 5MP Night Vision Camera</h5> 
            <p>  
            Able to display a live stream of the Raspberry Pi camera
             as well as capture videos and photos at any given time. It also comes with night vision
             capabilities, hence making it even more useful.
            </p>   
          </div>  
          </div>
      </div>  
      </div>
    </div>
  ); 
}



const Content = styled.div`
position: absolute;
top: 0px;
right:0px;



h1 {
font-weight: bold;
font-family: "Spline Sans Mono", monospace;
font-size: 30px;
margin: 0;

pointer-events: auto;
text-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);

}


}


`;


