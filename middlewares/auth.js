const jwt = require('jsonwebtoken');
const { promisify }=require('util')
const asyncverify=promisify(jwt.verify)
const User=require('../models/users')
const auth = async (req,res,next)=>{
    const {headers: { authorization } }=req
    if(!authorization){
        next((new Error('UN_AUTHENTICATED')))
    }
    try{
    const {id} =await asyncverify(authorization,'secret')
    const user = await User.findById(id).exec()
    req.user=user
    next()
}catch(e){
    next((new Error('UN_AUTHENTICATED')))
}
}
module.exports=auth