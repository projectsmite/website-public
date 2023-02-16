import * as awsIot from 'aws-iot-device-sdk'
import { deviceConfig } from '../config/awsConfig.js';
import { cards } from './tables.js';

var nfcPoll = async (callback) =>{
    let promise = new Promise(function (resolve){
        var device = awsIot.device({
            clientId: deviceConfig.clientId,
            host: deviceConfig.host,
            port: deviceConfig.port,
            keyPath: deviceConfig.keyPath,
            certPath: deviceConfig.certPath,
            caPath: deviceConfig.caPath,
        });
        device.subscribe('nfcPollResults')
        device.publish('nfcPoll', JSON.stringify({ message:'execute'}))
        device.on('message', function(topic, payload) {
            var message = JSON.parse(payload.toString())
            device.end()
            resolve(message)
        });
        
    })
    
    var results = await promise
    console.log(results)
    return callback(results)
}

var readMifare = async (filename, callback) =>{
    let promise = new Promise(function (resolve){
        var device = awsIot.device({
            clientId: deviceConfig.clientId,
            host: deviceConfig.host,
            port: deviceConfig.port,
            keyPath: deviceConfig.keyPath,
            certPath: deviceConfig.certPath,
            caPath: deviceConfig.caPath,
        });
        device.subscribe('readMifareResults')
        device.publish('readMifare', JSON.stringify({ message:'execute',filename:filename}))
        device.on('message', function(topic, payload) {
            var message = JSON.parse(payload.toString())
            device.end()
            resolve(message)
        });
        
    })

    var results = await promise
    console.log(results)
    callback(results)
}

var writeMifare = async (filepath, callback) =>{
    let promise = new Promise(function (resolve){
        var device = awsIot.device({
            clientId: deviceConfig.clientId,
            host: deviceConfig.host,
            port: deviceConfig.port,
            keyPath: deviceConfig.keyPath,
            certPath: deviceConfig.certPath,
            caPath: deviceConfig.caPath,
        });
        device.subscribe('writeMifareResults')
        device.publish('writeMifare', JSON.stringify({ message:'execute',filepath:filepath}))
        device.on('message', function(topic, payload) {
            var message = JSON.parse(payload.toString())
            device.end()
            resolve(message)
        });
        
    })

    var results = await promise
    console.log(results)
    callback(results)
}

var emulate = async (uid, callback) =>{
    let promise = new Promise(function (resolve){
        var device = awsIot.device({
            clientId: deviceConfig.clientId,
            host: deviceConfig.host,
            port: deviceConfig.port,
            keyPath: deviceConfig.keyPath,
            certPath: deviceConfig.certPath,
            caPath: deviceConfig.caPath,
        });
        device.subscribe('emulateResults')
        device.publish('emulate', JSON.stringify({ message:'execute',uid:uid}))
        device.on('message', function(topic, payload) {
            var message = JSON.parse(payload.toString())
            device.end()
            resolve(message)
        });
        
    })

    var results = await promise
    console.log(results)
    callback(results)
}

var fetchCards = async (callback) =>{
    try{
        var cardList = await cards.findAll() 
    }
    catch(err){
        callback(err,null)
    }
    console.log(cardList)
    callback(null, cardList)
}

var changeUid = async (uid, callback) =>{
    let promise = new Promise(function (resolve){
        var device = awsIot.device({
            clientId: deviceConfig.clientId,
            host: deviceConfig.host,
            port: deviceConfig.port,
            keyPath: deviceConfig.keyPath,
            certPath: deviceConfig.certPath,
            caPath: deviceConfig.caPath,
        });
        device.subscribe('changeUidResults')
        device.publish('changeUid', JSON.stringify({ message:'execute',uid:uid}))
        device.on('message', function(topic, payload) {
            var message = JSON.parse(payload.toString())
            device.end()
            resolve(message)
        });
        
    })

    var results = await promise
    console.log(results)
    callback(results)
}

export {nfcPoll, readMifare, writeMifare, emulate, fetchCards, changeUid}