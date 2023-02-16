import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../RFID-NFC/rfid-card.css'
import Sidebar from '../sidebar/sidebar';
import LoadingSpinner from "../spinner/spinner"
import * as Icon from 'react-bootstrap-icons';

export default function Images() {
  const [getPhotos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const renderImages = (
    getPhotos.map((item) => (
      <div className='col-md-4' id='Photos' style={{margin:'1.5% 0 5% 0',maxWidth:"100%"}} height={"auto"}>
        <a href={item.imageUrl} target="_blank"><img id='pack' height={'100%'} width={'100%'} style={{border:"3px solid #262626", borderRadius:10}} src={item.imageUrl} /></a>
        <a href={item.imageUrl} target="_blank" style={{color:'white'}}><h5 className='justify-content-center'>{item.image_name}</h5></a>
      </div> 
    ))
  );

  const handleFetch = () => {
    setIsLoading(true)
    setMessage('')
    axios.get('http://localhost:8081/assets/images')
    .then((response)=>{
      setIsLoading(false)
        console.log(response)
        setPhotos(response.data)
    })
    .catch((error)=>{
      setIsLoading(false)
        console.log(error)
        setMessage('Unable to retrieve Saved Images from database.')
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
    <div id='content' className=' d-flex justify-content-center'>
    <div className='col'>
    <div id='imagepage' className='card text-center'>
    <div className='overflow'>
      <img className='card-img-top' />
      </div>
      <div className='justify-content-center card-body text-light'>
        <h4 className='card-title'>Saved Photos</h4>
        <div className='row'>
          {isLoading ? <LoadingSpinner /> : renderImages}       
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