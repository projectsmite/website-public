import React, { useState, useEffect } from "react";
import axios from 'axios'
import './card-style-camera.css'
import LoadingSpinner from "../spinner/spinner"
import BlackBackground from "../../images/blackbackground.png"
import * as Icon from 'react-bootstrap-icons';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Table from 'react-bootstrap/Table';

const Livestream = props => {
  const [liveStream, setLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const checkStatus =() =>{
    axios.post('http://localhost:8081/camera/liveStreamStatus')
      .then((response) => {
        console.log(response)
        var ipAddr=response.data.ipAddr
        var link ="http://"+ipAddr+":8000/stream.mjpg"
        setLink(link)

      })
      .catch((error) => {
        console.log(error)

      })
  }

  const startStream = () => {
    setErrorMessage('')
    setIsLoading(true);
    axios.post('http://localhost:8081/camera/liveStream')
      .then((response) => {
        console.log(response)
        var ipAddr=response.data.ipAddr
        var link ="http://"+ipAddr+":8000/stream.mjpg"
        setIsLoading(false)
        setLink(link)

      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
        var reason = error.response.data.reason
        if (reason == 'liveStreamRunning') {
          setErrorMessage('The live stream is already running.')
        } else if (reason == 'cameraBusy'){
          setErrorMessage('The camera is currently running other processes.')
        } 
        else if (error.response.data == 'disconnected') {
          setErrorMessage('Smite Device is disconnected.')
        }

      })
  };

  const killStream = () =>{
    setErrorMessage('')
    setIsLoading(true);
    axios.post('http://localhost:8081/camera/killLiveStream')
      .then((response) => {
        console.log(response)
        setIsLoading(false)
        setErrorMessage("The live Stream has been killed.")
        setLink(BlackBackground)

      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
        var reason = error.response.data.reason
        if (reason == 'liveStreamNotRunning') {
          setErrorMessage('The live stream is not running.')
        } else if (error.response.data == 'disconnected') {
          setErrorMessage('Smite Device is disconnected.')
        }

      })
  }

  const captureImage = () =>{
    setErrorMessage('')
    setIsLoading(true);
    axios.post('http://localhost:8081/camera/captureImage')
      .then((response) => {
        console.log(response)
        setIsLoading(false)
        setErrorMessage("Image has been captured.")
        setLink(BlackBackground)

      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
        if (error.response.data == 'disconnected') {
          setErrorMessage('Smite Device is disconnected.')
        } else{
          setErrorMessage('Please reboot the device.')
        }

        //setErrorMessage(error.data.reason)

      })
  }

  const startVideo = () =>{
    setErrorMessage('')
    setIsLoading(true);
    axios.post('http://localhost:8081/camera/startRecording')
      .then((response) => {
        console.log(response)
        setIsLoading(false)
        setErrorMessage("Video has started recording.")
        setLink(BlackBackground)

      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
        if (error.response.data == 'disconnected') {
          setErrorMessage('Smite Device is disconnected.')
        } else if (error.response.data.reason=="alreadyRecording"){
          setErrorMessage('The camera is currently already recording a video.')
        } 
      })
  }

  const stopVideo = () =>{
    setErrorMessage('')
    setIsLoading(true);
    axios.post('http://localhost:8081/camera/stopRecording')
      .then((response) => {
        console.log(response)
        setIsLoading(false)
        setErrorMessage("Video has stopped recording and has been saved.")
        setLink(BlackBackground)

      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
        if (error.response.data == 'disconnected') {
          setErrorMessage('Smite Device is disconnected.')
        } else if (error.response.data.reason=='notRecording'){
          setErrorMessage('Smite Device is not recording.')      
        } else{
          setErrorMessage('Please reboot the device.')
        }
      })
  }

  const renderTooltip = (props) => (
    <Tooltip  className="justify-content-center" id="button-tooltip" {...props}>
        <div className="justify-content-center" style={{backgroundColor:'white',color:'black',padding:'5px',fontSize:'17px', fontWeight:'bold'}}>
          Do note that due to hardware limitations, only one function can run at a time.
        </div>
    </Tooltip>
  );

  const renderCard = (
    <div>
        <iframe id="stream" src={liveStream} title="test"/>
    </div>
  );

  useEffect(() => {
    setLink(BlackBackground)
    let ignore = false;
    if (!ignore)  checkStatus()
    return () => { ignore = true; }
    },[]);
  return (
    <>
      <div className='card text-center'>
        <div className='overflow'>
          <img className='card-img-top' />
        </div>
        <div className='card-body text-light'>
        <div className="d-flex justify-content-center">
          <h4 className=' card-title'>Camera</h4>
          <OverlayTrigger
          placement="left"
          delay={{ show: 200, hide: 350 }}
          overlay={renderTooltip}
          >
          
              <Icon.Info id="info" size={20}/>
          </OverlayTrigger>
          </div>
          <p className='card-text text-light'>
            Capture images and videos, or enable livestreaming from the device's camera to conduct stealth observations.
          </p>
          <div>
              <img id="stream" src={liveStream}/>
          </div>
            {isLoading==true && <LoadingSpinner/>}
          <div className="error">{errorMessage}</div>
          <button onClick={startStream} disabled={isLoading} href='#Data' className='btn btn-outline-light' >Start Livestream</button>
          <button onClick={killStream} disabled={isLoading} href='#Data' className='btn btn-outline-light' >Kill Livestream</button>
          <button onClick={captureImage} disabled={isLoading} href='#Data' className='btn btn-outline-light' >Take Picture</button>
          <button onClick={startVideo} disabled={isLoading} href='#Data' className='btn btn-outline-light' >Start Recording</button>
          <button onClick={stopVideo} disabled={isLoading} href='#Data' className='btn btn-outline-light' >Stop Recording</button>
        </div>
      </div>
    </>
  )
}

export default Livestream;