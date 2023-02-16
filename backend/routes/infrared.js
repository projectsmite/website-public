import express from 'express'
import { receivingSignal, editConfiguration, transmittingSignal, fetchCommands, fetchSignalFiles } from '../model/infrared.js'
import { checkConnection } from '../middleware/connection.js'
import { signalFiles } from '../model/tables.js'

const router = express.Router()

router.post('/receiveIR', checkConnection, async (req, res) => {
    var signalURL = req.body.signalURL
    var filename = req.body.fileName
    receivingSignal(signalURL, filename, (results) => {
        console.log(results)
        if (results.result == 'success') {
            var filePath = "/usr/src/smite/infrared/" + filename + ".lircd.conf"
            fetchSignalFiles((results) => {
                if (results != 'null') {
                    var tries = 0
                    for (var i = 0; i < results.length; i++) {
                        if (filename != results[i].remote_name) {
                            tries++
                        }
                    }
                    if (tries == results.length) {
                        signalFiles.create({ remote_name: filename, filePath: filePath })
                        res.status(200).send(results)
                    } else {
                        res.status(406).send("Duplicated Entry.")
                    }
                } else {
                    res.status(500).send(results)
                }
            })
        }
        else if (results.result == "failure") {
            res.status(500).send(results)
        }
    })
})

router.post('/editConfiguration', checkConnection, async (req, res) => {
    var signalFile = "/usr/src/smite/infrared/" + req.body.signalFile + ".lircd.conf"
    editConfiguration(signalFile, (results) => {
        if (results.result == 'success') {
            res.status(200).send(results)
        } else if (results.result == "failure") {
            res.status(500).send(results)
        }
    })
})

router.post('/transmitIR', checkConnection, async (req, res) => {
    var signalFile = req.body.signalFile
    var command = req.body.command
    transmittingSignal(signalFile, command, (results) => {
        if (results.result == 'success') {
            res.status(200).send(results)
        } else if (results.result == "failure" && results.reason == "wrong command") {
            res.status(404).send("Command Not Found")
        } else if (results.result == "failure") {
            res.status(500).send(results)
        }
    })
})

router.get('/getCommands', async (req, res) => {
    fetchCommands((results) => {
        if (results != 'null') {
            res.status(200).send(results)
        } else {
            res.status(500).send(results)
        }
    })
})

router.get('/getSignalFiles', async (req, res) => {
    fetchSignalFiles((results) => {
        if (results != 'null') {
            res.status(200).send(results)
        } else {
            res.status(500).send(results)
        }
    })
})

export { router }  