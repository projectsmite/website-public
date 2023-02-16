import express from 'express'
import { nfcPoll, readMifare , writeMifare, emulate, fetchCards, changeUid} from '../model/rfidandnfc.js'
import {checkConnection} from '../middleware/connection.js'
import { cards } from '../model/tables.js'

const router = express.Router()

router.post('/nfcPoll', checkConnection, async (req,res)=>{
    nfcPoll((results)=>{
        if (results.result == 'success'){
            res.status(200).send(results)
        } else if (results.result == "failure"){
            res.status(500).send(results)
        }
    })

})

router.post('/readMifare', checkConnection, async (req,res)=>{
    var filename = req.body.filename
    readMifare(filename, (results)=>{
        if (results.result == 'success'){
            var insertCard = cards.create({card_name:filename, filepath:results.filepath, uid:results.uid})
            res.status(200).send(results)
        } else if (results.result == "failure"){
            res.status(500).send(results)
        }
    })
})

router.post('/writeMifare',checkConnection, async (req,res) =>{
    var filepath = req.body.filepath
    writeMifare(filepath, (results)=>{
        if (results.result=="success"){
            res.status(200).send(results)
        } else if (results.result == "failure"){
            res.status(500).send(results)
        }
    })
})

router.post('/emulate', checkConnection, async (req,res)=>{
    var uid = req.body.uid
    emulate(uid, (results)=>{
        if (results.result=="success"){
            res.status(200).send(results)
        } else if (results.result=="failure"){
            res.status(500).send(results)
        }
    })
})

router.get('/fetchCards',async (req,res)=>{
    fetchCards((err, results)=>{
        if (err){
            res.status(500).send(err)
        } else{
            res.status(200).send(results)
        }
    })
})

router.post('/changeUid', checkConnection, async(req,res)=>{
    var uid = req.body.uid
    changeUid(uid, (results)=>{
        if (results.result=="success"){
            res.status(200).send(results)
        } else if (results.result == "failure"){
            res.status(500).send(results)
        }
    })
})

export{router}  