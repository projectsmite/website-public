import express from 'express'
import { liveStream, killLiveStream, liveStreamStatus, captureImage, startRecording, stopRecording} from '../model/camera.js'
import {checkConnection} from '../middleware/connection.js'
import {images, videos} from '../model/tables.js'

const router = express.Router()

router.post('/liveStream', checkConnection, async (req,res)=>{
    liveStream((results)=>{
        if (results.result == 'success'){
            res.status(200).send(results)
        } else if (results.result == "failure"){
            res.status(500).send(results)
        }
    })
})

router.post('/killLiveStream', checkConnection, async (req,res)=>{
    killLiveStream((results)=>{
        if (results.result == 'success'){
            res.status(200).send(results)
        } else if (results.result == "failure"){
            res.status(500).send(results)
        }
    })
})

router.post('/liveStreamStatus', checkConnection, async (req,res)=>{
    liveStreamStatus((results)=>{
        if (results.result == 'success'){
            res.status(200).send(results)
        } else if (results.result == "failure"){
            res.status(500).send(results)
        }
    })
})

router.post('/captureImage', checkConnection, async (req,res)=>{
    captureImage((results)=>{
        if (results.result == 'success'){
            var insertImage = images.create({image_name:results.filename})
            res.status(200).send(results)
        } else if (results.result == "failure"){
            res.status(500).send(results)
        }
    })
})

router.post('/startRecording', checkConnection, async (req, res)=>{
    startRecording((results)=>{
        if (results.result == 'success'){
            res.status(200).send(results)
        } else if (results.result == "failure"){
            res.status(500).send(results)
        }
    })
})

router.post('/stopRecording',checkConnection, async(req,res)=>{
    stopRecording((results)=>{
        if (results.result == 'success'){
            var insertVideo = videos.create({video_name:results.filename})
            res.status(200).send(results)
        } else if (results.result == "failure"){
            res.status(500).send(results)
        }
    })
})
export{router}