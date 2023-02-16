import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../RFID-NFC/rfid-card.css'
import Sidebar from '../sidebar/sidebar';
import LoadingSpinner from "../spinner/spinner"
import * as Icon from 'react-bootstrap-icons';

export default function Video() {
  const [getVideos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const renderCard = (
    getVideos.map((item) => (
      <div className='col-md-4' id='Videos' style={{margin:'1.5% 0 5% 0',maxWidth:"100%"}}>
        <video width='100%' height='100%' controls><source src={item.videoUrl} type="video/mp4"/></video>
        <a href={item.videoUrl} target="_blank" style={{color:'white'}}><h5 className='justify-content-center'>{item.video_name}</h5></a>
      </div> 
    ))
  );

  const handleFetch = () => {
    setIsLoading(true)
    setMessage('')
    axios.get('http://localhost:8081/assets/videos')
    .then((response)=>{
      setIsLoading(false)
        console.log(response)
        setVideos(response.data)
    })
    .catch((error)=>{
      setIsLoading(false)
        console.log(error)
        setMessage('Unable to retrieve Saved videos from database.')
    })
  }
  useEffect(() => {
    let ignore = false;
    if (!ignore) handleFetch()
    return () => { ignore = true; }
  }, []);
  return(
    <>
    <Sidebar />
    <div id='content' className=' justify-content-center'>
    <div className='col'>
    <div id='videopage' style={{width:'auto '}} className='card text-center'>
    <div className='overflow'>
      <img className='card-img-top' />
      </div>
      <div className='justify-content-center card-body text-light'>
        <h4 className='card-title'>Saved Videos</h4>
        <div className='row'>
          {isLoading ? <LoadingSpinner /> : renderCard}
          <div className="message">{message}</div>
        </div>
        <button id='refresh' onClick={handleFetch} ><Icon.Recycle /> Refresh</button>
      </div>
    </div>
    </div>
    </div>
    </>
  ) 
}
