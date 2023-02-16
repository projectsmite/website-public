import * as awsIot from 'aws-iot-device-sdk'
import { deviceConfig } from '../config/awsConfig.js';
import { commandSection, signalFiles } from './tables.js';

var receivingSignal = async (signalURL, filename, callback) => {
    let promise = new Promise(function (resolve) {
        var device = awsIot.device({
            clientId: deviceConfig.clientId,
            host: deviceConfig.host,
            port: deviceConfig.port,
            keyPath: deviceConfig.keyPath,
            certPath: deviceConfig.certPath,
            caPath: deviceConfig.caPath,
        });
        device.subscribe('irReceiveResults')
        device.publish('readingSignal', JSON.stringify({ message: 'execute', signalURL: signalURL, filename: filename}))
        device.on('message', function (topic, payload) {
            console.log(payload)
            var message = JSON.parse(payload.toString())
            console.log(message)
            device.end()
            resolve(message)
        });

    })
    var results = await promise
    console.log(results)
    return callback(results)
}

var editConfiguration = async (signalFile, callback) => {
    let promise = new Promise(function (resolve) {
        var device = awsIot.device({
            clientId: deviceConfig.clientId,
            host: deviceConfig.host,
            port: deviceConfig.port,
            keyPath: deviceConfig.keyPath,
            certPath: deviceConfig.certPath,
            caPath: deviceConfig.caPath,
        });
        device.subscribe('irEditResults')
        device.publish('editConfiguration', JSON.stringify({ message: 'execute', signalFile: signalFile}))
        device.on('message', function (topic, payload) {
            console.log(payload)
            var message = JSON.parse(payload.toString())
            console.log(message)
            device.end()
            resolve(message)
        });

    })
    var results = await promise
    console.log(results)
    return callback(results)
}

var transmittingSignal = async (signalFile, command, callback) => {
    let promise = new Promise(function (resolve) {
        var device = awsIot.device({
            clientId: deviceConfig.clientId,
            host: deviceConfig.host,
            port: deviceConfig.port,
            keyPath: deviceConfig.keyPath,
            certPath: deviceConfig.certPath,
            caPath: deviceConfig.caPath,
        });
        device.subscribe('irTransmitResults')
        device.publish('transmittingSignal', JSON.stringify({ message: 'execute', signalFile: signalFile, command: command }))
        device.on('message', function (topic, payload) {
            var message = JSON.parse(payload.toString())
            device.end()
            resolve(message)
        });

    })
    var results = await promise
    console.log(results)
    return callback(results)
}

var fetchCommands = async (callback) => {
    try {
        var commandList = await commandSection.findAll()
        callback(commandList, null)
    }
    catch (err) {
        callback(err, null)
    }
}

var fetchSignalFiles = async (callback) => {
    try {
        var commandList = await signalFiles.findAll()
        callback(commandList, null)
    }
    catch (err) {
        callback(err, null)
    }
}

export { receivingSignal, editConfiguration, transmittingSignal, fetchCommands, fetchSignalFiles }