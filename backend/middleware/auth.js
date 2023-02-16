import jwt from 'jsonwebtoken'
import {publicKey} from '../config/jwt.js'

async function checkIfLoggedIn(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    console.log("In auth..")
    if (!token) {
        return res.status(401).json({
            message: "Bad token",
        });
    }

    try {
        const auth = await jwt.verify(token, publicKey.USERFRONT_PUBLIC_KEY)
        console.log("Verified!")
        req.auth = auth;
        next()
    } catch (err){
        return res.status(401).json({
            message: 'Bad token'
        })
    }
}

export {checkIfLoggedIn}