import React, { useState } from "react";
import axios from 'axios'
import './rfid-card.css'
import LoadingSpinner from "../spinner/spinner"
import * as Icon from 'react-bootstrap-icons';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Table from 'react-bootstrap/Table';


const Identify = props => {
  const [IdentifyCard, setCard] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const handleFetch = () => {
    setErrorMessage('')
    setCard([])
    setIsLoading(true);
    axios.post('http://localhost:8081/rfidandnfc/nfcPoll')
      .then((response) => {
        console.log(response)
        setIsLoading(false)
        var cardInfoList = response.data.data.split('\n')
        console.log(cardInfoList)
        setCard(cardInfoList)

      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
        var reason = error.response.data.reason
        if (reason == 'timeout') {
          setErrorMessage('Request has timed out, please try again.')
        } else if (reason == 'deviceIssue') {
          setErrorMessage('Please reconnect the NFC Module.')
        } else if (reason=="inOtherProcess"){
          setErrorMessage('Device is in another process.')
        } else if (error.response.data == 'disconnected') {
          setErrorMessage('Smite Device is disconnected.')
        }
        //setErrorMessage(error.data.reason)
      })
  };

  const renderTooltip = (props) => (
    <Tooltip  className="justify-content-center" id="button-tooltip" {...props}>
      <Table striped bordered size="sm">
        <thead>
          <tr>
            <th>Header</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ISO/IEC</td> 
            <td>The international standard for information security used by the card.</td>   
          </tr>
          <tr>
            <td>ATQA</td>
            <td>Answer To Request, Type A. This is a protocol used by Mifare Cards.</td>
          </tr>
          <tr>
            <td>ATQB</td>
            <td>Answer to Request, Type B.</td>
          </tr>
          <tr>
            <td>UID</td>
            <td >The card's unique identifier.</td>
          </tr>
          <tr>
            <td>UID Size</td>
            <td>The size in bytes of the UID.</td>
          </tr>
          <tr>
            <td>SAK {`(SEL_RES)`}</td>
            <td>Select Acknowledge, Type A. These are manufacturer defined values and thus cannot be changed.</td>
          </tr>
        </tbody>
      </Table>
      {/* <Tooltip>
        <div className="justify-content-center" style={{backgroundColor:'white',color:'red',padding:'5px'}}>
          1.adsad asdasd <br/>
          2. asdasdasdsad aasd <br/>
          3. asdasdasd asdasda sdsada
        </div>
      </Tooltip> */}
    </Tooltip>
  );

  //Code to render the card details once recieved from API
  const renderCard = (
    <div className="userlist-container text-left">
      {IdentifyCard.map((item) => (
        <div className="card-detail">{item}</div>
      ))}
    </div>
  );


  return (
    <>
      <div  className='card text-center'>
        <div className='overflow'>
          <img className='card-img-top' />
        </div>
        <div className='card-body text-light'>
          <div className="d-flex justify-content-center">
          <h4 className=' card-title'>Identify a Card</h4>
          <OverlayTrigger
      placement="left"
      delay={{ show: 200, hide: 350 }}
      overlay={renderTooltip}
    >
    
        <Icon.Info id="info" size={20}/>
    </OverlayTrigger>
    </div>
          <p className='card-text text-light'>
            Scan a card with the SMITE Device to Identify the type of card it is. To do so, place the card at the Reader and click scan.
          </p>
          {isLoading ? <LoadingSpinner /> : renderCard}
          <div className="error">{errorMessage}</div>

          <button onClick={handleFetch} disabled={isLoading} href='#Data' className='btn btn-outline-light' >Scan</button>
        </div>
      </div>
    </>
  )
}

export default Identify;