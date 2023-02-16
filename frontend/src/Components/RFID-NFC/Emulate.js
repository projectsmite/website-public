import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './rfid-card.css'
import LoadingSpinner from "../spinner/spinner"
import Form from 'react-bootstrap/Form';
import * as Icon from 'react-bootstrap-icons';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Table from 'react-bootstrap/Table';

const Emulate = props => {
  //IdentifyCard is the actual state, setCard is the function that updates the state
  const [IdentifyCard, setCard] = useState([]);
  const [cardValues, setCardValues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [selects, setSelects] = useState([]);

  const handleFetch = () => {
    setMessage('')
    axios.get('http://localhost:8081/rfidandnfc/fetchCards')
      .then((response) => {
        var values = []
        console.log(response)
        //Updating the IdentifyCard state with response data from the axios get
        setCard(response.data)
        for (var i=0; i<response.data.length;i++){
          values.push(response.data[i].uid)
        }
        setCardValues(values)
      })
      .catch((error) => {
        console.log(error)
        setMessage('Unable to retrieve cards from database.')
      })
  }

  const handleSend = () => {
    console.log(selects)
    //Ensures user selects a card not the default option
    var uidList = selects.split(',')
    uid= uidList[0]
    console.log(uid)
    console.log(cardValues)
    if (!cardValues.includes(uid)) {
      setMessage("Please select a card.");
    } else {
      setIsLoading(true);
      setMessage('')
      var uid = uid.substring(2, uid.length)
      axios.post('http://localhost:8081/rfidandnfc/emulate', {
        uid: uid
      })
        .then((response) => {
          setIsLoading(false)
          console.log(response)
          setMessage('Successfully emulated card.')
        })
        .catch((error) => {
          setIsLoading(false)
          console.log(error)
          var reason = error.response.data.reason
          if (error.response.data == "disconnected") {
            setMessage('Smite Device is disconnected.')
          } else if (reason == "timeout") {
            setMessage('Request has timed out, please try again.')
          } else if (reason == "deviceIssue") {
            setMessage('Please reconnect the NFC Module.')
          } else if (reason=="inOtherProcess"){
            setMessage('Device is in another process.')
          } 
        })
    }
  }

  const renderTooltip = (props) => (
    <Tooltip  className="justify-content-center" id="button-tooltip" {...props}>
        <div className="justify-content-center" style={{backgroundColor:'white',color:'black',padding:'5px',fontSize:'17px', fontWeight:'bold'}}>
          Do note that due to hardware limitations, only cards with Unique Identifiers (UID) starting with 0x08 can be emulated.<br/>
          (Eg. 08123456)
        </div>
    </Tooltip>
  );
  
  const renderCard = (
    <div className="card-container">
      <div id="forms" >
      <Form.Group aria-label="Default select">
        <Form.Control value={selects} onChange={e => setSelects(e.target.value)} as="select">
          <option >Select your Card</option>
          {IdentifyCard.map((item) => (
            <option value={[item.uid,item.card_name]}>{item.card_name}</option>
          ))}
        </Form.Control>
      </Form.Group>
      </div>
    </div>
  );

  // Loads cards list when page loads
  useEffect(() => {
    let ignore = false;
    if (!ignore) handleFetch()
    return () => { ignore = true; }
  }, []);
  return (
    <div className='card text-center'>
      <div className='overflow'>
        <img className='card-img-top' />
      </div>
      <div className='card-body text-light'>
      <div className="d-flex justify-content-center">
          <h4 className=' card-title'>Emulate</h4>
          <OverlayTrigger
      placement="left"
      delay={{ show: 200, hide: 350 }}
      overlay={renderTooltip}
    >
    
        <Icon.Info id="info" size={20}/>
    </OverlayTrigger>
    </div>
        <p className='card-text text-light'>
          Perform card emulation.
        </p>
        {isLoading ? <LoadingSpinner /> : renderCard}
        <div className="message">{message}</div>

        <button href='#Data' data-toggle="collapse" className='btn btn-outline-light' onClick={handleSend}>Select card</button>
      </div>
    </div>
  )
}

export default Emulate