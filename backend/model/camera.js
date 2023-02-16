import * as awsIot from 'aws-iot-device-sdk'
import { deviceConfig } from '../config/awsConfig.js';

var liveStream = async (callback) =>{
    let promise = new Promise(function (resolve){
        var device = awsIot.device({
            clientId: deviceConfig.clientId,
            host: deviceConfig.host,
            port: deviceConfig.port,
            keyPath: deviceConfig.keyPath,
            certPath: deviceConfig.certPath,
            caPath: deviceConfig.caPath,
        });
        device.subscribe('liveStreamResults')
        device.publish('liveStream', JSON.stringify({ message:'execute'}))
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

var killLiveStream = async (callback) =>{
    let promise = new Promise(function (resolve){
        var device = awsIot.device({
            clientId: deviceConfig.clientId,
            host: deviceConfig.host,
            port: deviceConfig.port,
            keyPath: deviceConfig.keyPath,
            certPath: deviceConfig.certPath,
            caPath: deviceConfig.caPath,
        });
        device.subscribe('killLiveStreamResults')
        device.publish('killLiveStream', JSON.stringify({ message:'execute'}))
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

var liveStreamStatus = async (callback) =>{
    let promise = new Promise(function (resolve){
        var device = awsIot.device({
            clientId: deviceConfig.clientId,
            host: deviceConfig.host,
            port: deviceConfig.port,
            keyPath: deviceConfig.keyPath,
            certPath: deviceConfig.certPath,
            caPath: deviceConfig.caPath,
        });
        device.subscribe('liveStreamStatusResults')
        device.publish('liveStreamStatus', JSON.stringify({ message:'execute'}))
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

var captureImage = async (callback) =>{
    let promise = new Promise(function (resolve){
        var device = awsIot.device({
            clientId: deviceConfig.clientId,
            host: deviceConfig.host,
            port: deviceConfig.port,
            keyPath: deviceConfig.keyPath,
            certPath: deviceConfig.certPath,
            caPath: deviceConfig.caPath,
        });
        device.subscribe('takePicResults')
        device.publish('takePic', JSON.stringify({ message:'execute'}))
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

var startRecording = async (callback) =>{
    let promise = new Promise(function (resolve){
        var device = awsIot.device({
            clientId: deviceConfig.clientId,
            host: deviceConfig.host,
            port: deviceConfig.port,
            keyPath: deviceConfig.keyPath,
            certPath: deviceConfig.certPath,
            caPath: deviceConfig.caPath,
        });
        device.subscribe('startVideoResults')
        device.publish('startVideo', JSON.stringify({ message:'execute'}))
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

var stopRecording = async (callback) =>{
    let promise = new Promise(function (resolve){
        var device = awsIot.device({
            clientId: deviceConfig.clientId,
            host: deviceConfig.host,
            port: deviceConfig.port,
            keyPath: deviceConfig.keyPath,
            certPath: deviceConfig.certPath,
            caPath: deviceConfig.caPath,
        });
        device.subscribe('endVideoResults')
        device.publish('endVideo', JSON.stringify({ message:'execute'}))
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

export {liveStream, killLiveStream, liveStreamStatus, captureImage, startRecording, stopRecording}