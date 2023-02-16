import { s3Config } from "../config/s3Config.js";
import { videos, images } from "./tables.js";
import { S3Client,GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
    region:s3Config.bucketRegion,
    credentials:{
        accessKeyId:s3Config.accessKey,
        secretAccessKey:s3Config.secretAccessKey
    }
})

var fetchImages = async (callback) =>{
    try{
        var imagesList = await images.findAll()
        console.log(imagesList.length)
        for (const image of imagesList){
            const getObjectParams = {
                Bucket: s3Config.bucketName,
                Key:image.image_name
            }
            const command = new GetObjectCommand(getObjectParams)
            const url = await getSignedUrl(s3,command,{expiresIn:3600})
            image.dataValues.imageUrl = url
        }
        callback(null, imagesList)
    }
    catch(err){
        console.log(err)
        callback(err,null)
    }
    //console.log(imagesList)
}

var fetchVideos = async (callback) =>{
    try{
        var videosList = await videos.findAll()
        for (const video of videosList){
            const getObjectParams = {
                Bucket: s3Config.bucketName,
                Key:video.video_name
            }
            const command = new GetObjectCommand(getObjectParams)
            const url = await getSignedUrl(s3,command,{expiresIn:3600})
            video.dataValues.videoUrl = url
        }
        callback(null, videosList)
    }
    catch(err){
        console.log(err)
        callback(err,null)
    }
    //console.log(imagesList)
}

export {fetchImages, fetchVideos}