//content text Still has space below sidebar when resizing, adjust css

import './RFID-NFC/rfid-card.css'
import Save from './RFID-NFC/Save'
import Identify from './RFID-NFC/Identify'
import Emulate from './RFID-NFC/Emulate'
import Write from './RFID-NFC/write'
import ChangeUid from './RFID-NFC/changeUid'
import React, {Component} from 'react';
import Sidebar from './sidebar/sidebar';


class Cards extends Component{
  render(){
  return(
    <>
    <Sidebar/>
    <div id='content' className=' d-flex justify-content-center'>
        <div id='rfidPage' className='col'>
          <Identify />
          <Save />
          <Write />
          <ChangeUid/>
          <Emulate />
        </div>
    </div>
    </>
  );
}
}

export default Cards

