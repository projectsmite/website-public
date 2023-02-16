import React from "react";
import './rfid-card.css'
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import * as Icon from 'react-bootstrap-icons';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Table from 'react-bootstrap/Table';
import LoadingSpinner from "../spinner/spinner"
import axios from "axios";

const Save = props => {
  const [Nameblock, setName] = useState('');
  const [IdentifyCard, setCard] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [Message, setMessage] = useState("");


  //Save card name
  const handleChange = event => {
    setName(event.target.value);
  };

  var nameRegExp = new RegExp(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)
  const handleClick = event => {
    event.preventDefault();
    if (!nameRegExp.test(Nameblock) && Nameblock.length != 0) {
      console.log('input value is valid ');
      setMessage('')
      setIsLoading(true);
      axios.post('http://localhost:8081/rfidandnfc/readMifare', {
        filename: Nameblock
      })
        .then((response) => {
          setIsLoading(false)
          setMessage('Card saved successfully.')
          window.location.reload(true)
        })
        .catch((error) => {
          setIsLoading(false)
          console.log(error)
          var reason = error.response.data.reason
          if (error.response.data == 'disconnected') {
            setMessage('Smite Device is disconnected.')
          } else if (reason == 'filenameExists') {
            setMessage('This card name already exists.')
          } else if (reason == 'failedToRead') {
            setMessage('Failed to read card, please try again.')
          } else if (reason == 'deviceIssue') {
            setMessage('Please reconnect the NFC Module.')
          } else if (reason == 'noTagPresent') {
            setMessage('There is no card present.')
          } else if (reason == 'inOtherProcess'){
            setMessage('Device is in another process.')
          }
        })


    } else {
      console.log('input value is empty');
      setMessage("Please use a name without whitespaces and symbols.");
    }
  };

  const renderTooltip = (props) => (
    <Tooltip  className="justify-content-center" id="button-tooltip" {...props}>
        <div className="justify-content-center" style={{backgroundColor:'white',color:'black',padding:'5px',fontSize:'17px', fontWeight:'bold'}}>
          Note that this utility will only work with Mifare Classic cards.
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
          <h4 className=' card-title'>Save Card Data</h4>
          <OverlayTrigger
      placement="left"
      delay={{ show: 200, hide: 350 }}
      overlay={renderTooltip}
    >
    
        <Icon.Info id="info" size={20}/>
    </OverlayTrigger>
    </div>
        <p className='card-text text-light'>
          Scan a card to save its data for cloning.
        </p>
        <div id="forms" >
        <Form.Label htmlFor="inputPassword5">Name</Form.Label>
        <Form.Control
          type="Name"
          id="Nameblock"
          placeholder="Name The Card To Save"
          onChange={handleChange}
          required
          

        />
        </div>
        {isLoading==true && <LoadingSpinner/>}
        <div className="message">{Message}</div>
        <button onClick={handleClick} href='#Data' className='btn btn-outline-light' >Scan</button>
      </div>
    </div>
  )
}

export default Save