import React, { useState } from "react";
import axios from 'axios'
import './ir-card.css'
import LoadingSpinner from "../spinner/spinner"
import Form from 'react-bootstrap/Form';
import * as Icon from 'react-bootstrap-icons';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Table from 'react-bootstrap/Table';
//DISCLAIMER: If signal file name is incorrect, the transmitting function will not work! (to add in popup)
const Receive = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [upperMessage, setUpperMessage] = useState("");
    const [lowerMessage, setLowerMessage] = useState("");
    const [URLblock, setURL] = useState('');
    const [Fileblock, setFileName] = useState('');

    var URLRegExp = new RegExp("https://")
    var fileNameRegExp = new RegExp(/[ !@#$%^&*()+\=\[\]{};':"\\|,.<>\/?]/)

    const handleFetch = () => {
        setUpperMessage('')
        setLowerMessage('')
        setIsLoading(true);

        if (URLblock.length == 0 && Fileblock.length == 0) {
            setUpperMessage("Empty URL Field")
            setLowerMessage("Empty Filename")
            setIsLoading(false)
        } else if (!URLRegExp.test(URLblock) && Fileblock.length == 0) {
            setUpperMessage("Invalid URL")
            setLowerMessage("Empty Filename")
            setIsLoading(false)
        } else if (URLRegExp.test(URLblock) && Fileblock.length == 0) {
            setUpperMessage("Valid URL")
            setLowerMessage("Empty Filename")
            setIsLoading(false)
        } else if (URLblock.length == 0 && fileNameRegExp.test(Fileblock)) {
            setUpperMessage("Empty URL")
            setLowerMessage("Invalid Filename")
            setIsLoading(false)
        } else if (URLblock.length == 0 && !fileNameRegExp.test(Fileblock)) {
            setUpperMessage("Empty URL")
            setLowerMessage("Valid Filename")
            setIsLoading(false)
        } else if (URLRegExp.test(URLblock) && fileNameRegExp.test(Fileblock)) {
            setUpperMessage("Valid URL")
            setLowerMessage("Invalid Filename")
            setIsLoading(false)
        } else if (!URLRegExp.test(URLblock) && !fileNameRegExp.test(Fileblock)) {
            setUpperMessage("Invalid URL")
            setLowerMessage("Valid Filename")
            setIsLoading(false)
        } else {
            axios.post('http://localhost:8081/infrared/receiveIR', {
                signalURL: URLblock,
                fileName: Fileblock
            })
                .then((response) => {
                    setLowerMessage("Successfully Received IR Signal File.")
                    setIsLoading(false)
                    window.location.reload()
                })
                .catch((error) => {
                    console.log(error)
                    setIsLoading(false)
                    var reason = error.response.data.reason
                    console.log(error.response.statusText)
                    if (error.response.statusText == "Not Acceptable") {
                        setLowerMessage('Signal File Exists.')
                    } else if (reason == 'timeout') {
                        setLowerMessage('Request has timed out, please try again.')
                    } else if (error.response.data == 'disconnected') {
                        setLowerMessage('Smite Device is disconnected.')
                    } else if (reason=="inOtherProcess"){
                        setLowerMessage('Device is in another process.')
                    }
                })
        }
    };

    const handleChange = event => {
        setURL(event.target.value);
    };

    const handleFileName = event => {
        setFileName(event.target.value);
    };

    const renderTooltip = (props) => (
        <Tooltip  className="justify-content-center" id="button-tooltip" {...props}>
            <div className="justify-content-center" style={{backgroundColor:'white',color:'black',padding:'5px',fontSize:'17px', fontWeight:'bold'}}>
                Do note that for that if the Signal File Name is not the same as the name in the config file, this function will not work.
                <br/>
                <span style={{fontSize:'15px'}}>Head to https://lirc.sourceforge.net/remotes/ to view readily available config files.</span>
            </div>
        </Tooltip>
      );

    return (
        <>
            <div className='card text-center'>
                <div className='overflow'>
                    <img className='card-img-top' />
                </div>
                <div className='card-body text-light'>
                    <div className="d-flex justify-content-center">
                        <h4 className=' card-title'>Receiving Infrared Signal Files</h4>
                        <OverlayTrigger
                    placement="left"
                    delay={{ show: 200, hide: 350 }}
                    overlay={renderTooltip}
                    >
                    
                        <Icon.Info id="info" size={20}/>
                    </OverlayTrigger>
                    </div>
                    <p className='card-text text-light'>
                       Download infrared signals files from the web.
                    </p>
                    <div id="forms" >
                    <Form.Label htmlFor="inputPassword5">URL to Signal File</Form.Label>
                    <Form.Control
                        type="Name"
                        id="URLblock"
                        placeholder="URL of Signal File"
                        onChange={handleChange}
                        required
                    />
                    {isLoading ? <LoadingSpinner /> : <div className="lowermessage">{upperMessage}</div>}
                    <Form.Label htmlFor="inputPassword5">Signal File Name (Please provide the name in the configuration file)</Form.Label>
                    <Form.Control
                        type="Name"
                        id="Fileblock"
                        placeholder="Provide a Signal File Name"
                        onChange={handleFileName}
                        required
                    />
                    {isLoading ? <LoadingSpinner /> : <div className="uppermessage">{lowerMessage}</div>}
                    <button onClick={handleFetch} disabled={isLoading} href='#Data' className='btn btn-outline-light' >Send</button>
                </div>
            </div>
            </div>
        </>
    )
    
}

export default Receive;