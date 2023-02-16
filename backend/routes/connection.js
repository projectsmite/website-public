import express from 'express'
import { checkConnection } from '../middleware/connection.js'

const router = express.Router();

router.post('/checkConnection', checkConnection, async (req, res) => {
    res.status(200).send('connected');
})

export { router };