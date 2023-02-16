import * as awsIot from 'aws-iot-device-sdk'
import { deviceConfig } from '../config/awsConfig.js';

var checkConnection = async (req, res, next) => {
    let promise = new Promise(function (resolve) {
        var device = awsIot.device({
            clientId: deviceConfig.clientId,
            host: deviceConfig.host,
            port: deviceConfig.port,
            keyPath: deviceConfig.keyPath,
            certPath: deviceConfig.certPath,
            caPath: deviceConfig.caPath,
        });
        device.subscribe('$aws/things/smite-device/shadow/get/accepted')
        device.publish('$aws/things/smite-device/shadow/get', '')
        device.on('message', function (topic, payload) {
            var message = JSON.parse(payload.toString())
            device.end()
            resolve(message)
        });

    })

    var doneMessage = await promise
    // console.log(doneMessage)
    if (doneMessage.state.reported.connected == "disconnected") {
        res.status(401).send('disconnected')
        return
    }
    next();
};

export { checkConnection }