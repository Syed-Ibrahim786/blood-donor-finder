import express from 'express'
import jwt from 'jsonwebtoken'


export function protect(req, res, next){
    const token = req.headers.authorization?.split(' ')[1]
    if(!token){
        return res.status(403).redirect('/login')
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded
        next()
    }catch(e){
        res.status(403).redirect('/login')
    }
}