import React, { useState, useEffect } from "react";
import axios from 'axios'
import './ir-card.css'
import LoadingSpinner from "../spinner/spinner"
import Form from 'react-bootstrap/Form';

const Transmit = props => {
    const [isLoadingSignal, setIsLoadingSignal] = useState(false);
    const [isLoadingCommand, setIsLoadingCommand] = useState(false);
    const [signalMessage, setSignalMessage] = useState("");
    const [transmitMessage, setTransmitMessage] = useState("");
    const [IdentifyCommand, setCommand] = useState([]);
    const [IdentifySignal, setSignal] = useState([]);
    const [selectsCommand, setSelectsCommand] = useState();
    const [selectsSignal, setSelectsSignal] = useState();

    const fetchAllInformation = () => {
        setTransmitMessage('')
        axios.get('http://localhost:8081/infrared/getSignalFiles')
            .then((response) => {
                console.log(response)
                setSignal(response.data)
            })
            .catch((error) => {
                console.log(error)
                setTransmitMessage('Unable to retrieve commands from database.')
            })

        setSignalMessage('')
        axios.get('http://localhost:8081/infrared/getCommands')
            .then((response) => {
                console.log(response)
                setCommand(response.data)
            })
            .catch((error) => {
                console.log(error)
                setSignalMessage('Unable to retrieve signal files from database.')
            })
    }

    const handleEditConfiguration = event => {
        if (selectsSignal == "Select Signal File" | selectsSignal == undefined) {
            setSignalMessage("Please select a signal file.");
        } else {
            event.preventDefault();
            setSignalMessage('')
            setIsLoadingSignal(true);
            axios.post('http://localhost:8081/infrared/editConfiguration', {
                signalFile: selectsSignal,
            })
                .then((response) => {
                    setIsLoadingSignal(false)
                    setSignalMessage('Successfully Changed Signal File.')
                })
                .catch((error) => {
                    setIsLoadingSignal(false)
                    if (error.response.data == 'disconnected') {
                        setSignalMessage('Smite Device is disconnected.')
                    } else if (error.response.data=="inOtherProcess"){
                        setSignalMessage('Device is in another process.')
                    }
                })
        }
    };

    const handleFetch = event => {
        if (selectsSignal == "Select Signal File" | selectsSignal == undefined) {
            setTransmitMessage("Please select a signal file.");
        } else if (selectsCommand == "Select Command To Send" || selectsCommand == undefined) {
            setTransmitMessage("Please select a command.");
        } else {
            event.preventDefault();
            setTransmitMessage('')
            setIsLoadingCommand(true);
            axios.post('http://localhost:8081/infrared/transmitIR', {
                signalFile: selectsSignal,
                command: selectsCommand
            })
                .then((response) => {
                    setIsLoadingCommand(false)
                    setTransmitMessage('Successfully Transmitted IR Signal.')
                })
                .catch((error) => {
                    setIsLoadingCommand(false)
                    if (error.response.data == 'disconnected') {
                        setTransmitMessage('Smite Device is disconnected.')
                    } else if (error.response.data == 'Command Not Found') {
                        setTransmitMessage('Command is not available in signal file.')
                    } else if (error.response.data=="inOtherProcess"){
                        setTransmitMessage('Device is in another process.')
                    }
                })
        }
    };

    useEffect(() => {
        let ignore = false;
        if (!ignore) fetchAllInformation()
        return () => { ignore = true; }
    }, []);

    const renderSignalFiles = (
        <div className="card-container">
            <div id="forms" >
            <Form.Group aria-label="Default select ">
                <Form.Control value={selectsSignal} onChange={e => setSelectsSignal(e.target.value)} as="select">
                    <option >Select Signal File</option>
                    {IdentifySignal.map((item) => (
                        <option value={item.remote_name}>{item.remote_name}</option>
                    ))}
                </Form.Control>
            </Form.Group>
            </div>
        </div>
    );

    const renderCommands = (
        <div className="card-container">
            <div id="forms" >
            <Form.Group aria-label="Default select ">
                <Form.Control value={selectsCommand} onChange={e => setSelectsCommand(e.target.value)} as="select">
                    <option >Select Command To Send</option>
                    {IdentifyCommand.map((item) => (
                        <option value={item.command_name}>{item.command_name}</option>
                    ))}
                </Form.Control>
            </Form.Group>
            </div>
        </div>
    );

    return (
        <>
            <div className='card text-center'>
                <div className='overflow'>
                    <img className='card-img-top' />
                </div>
                <div className='card-body text-light'>
                    <h4 className='card-title'>Transmitting Infrared Signal</h4>
                    <p className='card-text text-light'>
                        Please follow according to the steps provided
                    </p>
                    <h6 className='card-title'>Step 1: Choose a signal file</h6>
                    {isLoadingSignal ? <LoadingSpinner /> : renderSignalFiles}
                    <div className="signalMessage">{signalMessage}</div>
                    <button onClick={handleEditConfiguration} disabled={isLoadingSignal} href='#Data' className='btn btn-outline-light' >Select Configuration File</button>
                    <h6 className='card-title'>Step 2: Choose the type of signal to transmit</h6>
                    {isLoadingCommand ? <LoadingSpinner /> : renderCommands}
                    <div className="transmitMessage">{transmitMessage}</div>
                    <button onClick={handleFetch} disabled={isLoadingCommand} href='#Data' className='btn btn-outline-light' >Transmit</button>
                </div>
            </div>
        </>
    )
}

export default Transmit;
