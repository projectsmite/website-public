import express from 'express'
const router = express.Router()
import { fetchImages, fetchVideos } from '../model/assets.js'

router.get('/images',async (req,res)=>{
    fetchImages((err, results)=>{
        if (err){
            res.status(500).send(err)
        } else{
            res.status(200).send(results)
        }
    })
})

router.get('/videos',async (req,res)=>{
    fetchVideos((err, results)=>{
        if (err){
            res.status(500).send(err)
        } else{
            res.status(200).send(results)
        }
    })
})


export{router}  