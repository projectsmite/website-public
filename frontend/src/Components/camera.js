
import React, {Component} from 'react';
import Livestream from './camera/livestream';
import Sidebar from './sidebar/sidebar';
import './RFID-NFC/rfid-card.css'

class camera extends Component{
  render(){
  return(
    <>
    <Sidebar />
    <div id='content' className=' d-flex justify-content-center'>
        <div id='cameraPage' className='col'>
          <Livestream/>
        </div>
    </div>
    </>
  );
}
}
export default camera