import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './rfid-card.css'
import LoadingSpinner from "../spinner/spinner"
import Form from 'react-bootstrap/Form';
import * as Icon from 'react-bootstrap-icons';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Table from 'react-bootstrap/Table';

const Write = props => {
  const [IdentifyCard, setCard] = useState([]);
  const [cardValues, setCardValues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [selects,setSelects] = useState();
  const handleFetch = () => {
    setMessage('')
    //GET request
    axios.get('http://localhost:8081/rfidandnfc/fetchCards')
    //Handling success
    .then((response)=>{
        var values =[]
        console.log(response)
        setCard(response.data)
        for (var i=0; i<response.data.length;i++){
          values.push(response.data[i].filepath)
        }
        setCardValues(values)
    })
    //Error Handling
    .catch((error)=>{
        console.log(error)
        setMessage('Unable to retrieve cards from database.')
    })
  }

  const handleSend = () => {
    console.log(selects)
    console.log(cardValues)
    //Ensures user selects an appropriate option
    if (!cardValues.includes(selects)) {
      setMessage("Please select a card.");
    } else {
        setIsLoading(true);
        setMessage('')
        axios.post('http://localhost:8081/rfidandnfc/writeMifare',{
            filepath:selects
        })
        .then((response)=>{
            setIsLoading(false)
            setMessage("Card successfully cloned.")
            console.log(response)
        })
        .catch((error)=>{
            console.log(error)
            setIsLoading(false)
            var reason=error.response.data.reason
            if (error.response.data=="disconnected"){
                setMessage('Smite Device is disconnected.')
            } else if (reason=="wrongCardType"){
                setMessage('Card used to clone is wrong.')
            } else if (reason=="failedToWrite"){
                setMessage('Failed to read card, please try again.')
            } else if (reason=="noTagPresent"){
                setMessage('There is no card present.')
            } else if (reason=="deviceIssue"){
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
          Note that this utility will only work with Mifare Classic cards.
        </div>
    </Tooltip>
  );

  const renderCard = (
    <div className="card-container">
      <div id="forms" >
      <Form.Group aria-label="Default select ">
        <Form.Control value={selects} onChange={e=>setSelects(e.target.value)} as="select">
          <option >Select your Card</option>
          {IdentifyCard.map((item) => (
            <option value={item.filepath}>{item.card_name}</option>
          ))}
        </Form.Control>
      </Form.Group>
      </div>
  </div>
  );

  // Loads cards list when page loads
  useEffect(() => {
    let ignore = false;
    if (!ignore)  handleFetch()
    return () => { ignore = true; }
    },[]);
    
    return(
        <div className='card text-center'>
        <div className='overflow'>
          <img className='card-img-top' />
          </div>
          <div className='card-body text-light'>
          <div className="d-flex justify-content-center">
          <h4 className=' card-title'>Clone a Card</h4>
          <OverlayTrigger
      placement="left"
      delay={{ show: 200, hide: 350 }}
      overlay={renderTooltip}
    >
    
        <Icon.Info id="info" size={20}/>
    </OverlayTrigger>
    </div>
            <p className='card-text text-light'>
              Perform card cloning.
            </p>          
            {isLoading ? <LoadingSpinner /> : renderCard}
            <div className="message">{message}</div>


            <button href='#Data' data-toggle="collapse" className='btn btn-outline-light' onClick={handleSend}>Select card</button>
          </div>
        </div>
    )
}

export default Write