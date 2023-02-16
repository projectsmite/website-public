import express from 'express'
import cors from 'cors'
import flash from 'express-flash'

// Routes
import { router as connectionRouter } from './routes/connection.js'
import { router as rfidandnfcRouter } from './routes/rfidandnfc.js'
import { router as infraredRouter } from './routes/infrared.js'
import {router as cameraRouter} from './routes/camera.js'
import {router as assetsRouter} from './routes/assets.js'
const app = express()

app.use(flash())
app.options('*', cors());
app.use(cors({ credentials: true }));


app.use(express.json()); // parse application/json
app.use(express.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded


app.use("/connect", connectionRouter)
app.use("/rfidandnfc", rfidandnfcRouter)
app.use("/infrared", infraredRouter)
app.use("/camera",cameraRouter)
app.use("/assets",assetsRouter)

const port = process.env.PORT || 8081

var server = app.listen(port, function () {
    console.log('Web App Hosted at http://localhost:%s', port);
});