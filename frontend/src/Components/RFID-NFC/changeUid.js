import React from "react";
import './rfid-card.css'
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import LoadingSpinner from "../spinner/spinner"
import axios from "axios";
import * as Icon from 'react-bootstrap-icons';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Table from 'react-bootstrap/Table';

const ChangeUid = props => {
  const [Nameblock, setName] = useState('');
  const [IdentifyCard, setCard] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [Message, setMessage] = useState("");


  //Save card name
  const handleChange = event => {
    setName(event.target.value);
  };

  var nameRegExp = new RegExp(/^[0-9a-fA-F]{8}$/)
  const handleClick = event => {
    event.preventDefault();
    if (nameRegExp.test(Nameblock)) {
      console.log('input value is valid ');
      setMessage('')
      setIsLoading(true);
      axios.post('http://localhost:8081/rfidandnfc/changeUid', {
        uid: Nameblock
      })
        .then((response) => {
          setIsLoading(false)
          setMessage('UID changed successfully.')
        })
        .catch((error) => {
          setIsLoading(false)
          console.log(error)
          var reason = error.response.data.reason
          if (error.response.data == 'disconnected') {
            setMessage('Smite Device is disconnected.')
          } else if (reason == 'failedToChange') {
            setMessage('Failed to change card UID, please try again.')
          } else if (reason == 'deviceIssue') {
            setMessage('Please reconnect the NFC Module.')
          } else if (reason == 'noTagPresent') {
            setMessage('There is no card present.')
          } else if (reason=="inOtherProcess"){
            setMessage('Device is in another process.')
          } 
        })


    } else {
      setMessage("Please use 4 byte hexadecimal (eg. 01234567).");
    }
  };

  const renderTooltip = (props) => (
    <Tooltip  className="justify-content-center" id="button-tooltip" {...props}>
        <div className="justify-content-center" style={{backgroundColor:'white',color:'black',padding:'5px',fontSize:'17px', fontWeight:'bold'}}>
          Note that this utility will only work with special Mifare Classic clones.
        </div>
    </Tooltip>
  );

  return (
    <div className='card text-center'>
      <div className='overflow'>
        <img className='card-img-top' />
      </div>
      <div className='card-body text-light'>
      <div className="d-flex justify-content-center">
          <h4 className=' card-title'>Change Card UID</h4>
          <OverlayTrigger
      placement="left"
      delay={{ show: 200, hide: 350 }}
      overlay={renderTooltip}
    >
    
        <Icon.Info id="info" size={20}/>
    </OverlayTrigger>
    </div>
        <p className='card-text text-light'>
          Enter a new UID for the card.
        </p>
        <div id="forms" >
        <Form.Label htmlFor="inputPassword5">Name</Form.Label>
        <Form.Control
          type="Name"
          id="Nameblock"
          placeholder="Enter a 4-byte UID"
          onChange={handleChange}
          required
          

        />
        </div>
        {isLoading==true && <LoadingSpinner/>}
        <div className="message">{Message}</div>
        <button onClick={handleClick} href='#Data' className='btn btn-outline-light' >Change</button>
      </div>
    </div>
  )
}

export default ChangeUid