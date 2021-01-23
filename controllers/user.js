const User=require('../models/users')
const jwt = require('jsonwebtoken');
const {promisify}=require('util')
const asyncSign = promisify(jwt.sign);
const create = (user) => User.create(user);
const getAll =() => User.find({}).exec()
const getById = (id) => User.findById(id).exec()
const update =(id,data) => User.findByIdAndUpdate(id,data , {new:true})
const deleteOne= (id) => User.findByIdAndRemove(id).exec()
const login =async ({username,password}) =>{
   const user =await User.findOne({username}).exec()
   if(!user){
      throw Error('UN_AUTHENTICATED')
   }
   const isvalid = user.validatepassword (password)
   if(!isvalid){
      throw Error('UN_AUTHENTICATED')
   }
   const token=await asyncSign({
      username:user.username,
      id:user.id
    }, 'secret', { expiresIn: '1d'});
   return {...user.toJSON(),token}
}
const follow = (userid,followid) => {
   User.findByIdAndUpdate(userid,{$addToSet:{following:followid}},{new:true}).exec()   
   User.findByIdAndUpdate(followid,{$addToSet:{follower:userid}},{new:true}).exec()   
   
return("status:followed")
}
const unfollow = (userid,followid) => {
   User.findByIdAndUpdate(userid,{$pull:{following:followid}},{new:true}).exec()   
   User.findByIdAndUpdate(followid,{$pull:{follower:userid}},{new:true}).exec()   
return("status:unfollowe")
}
const getfollowers=async(id)=>{
   const {follower}=await getById(id)
   return User.find().where('_id').in(follower).exec();
}
const getfollowing=async(id)=>{
   const {following}=await getById(id)
   return User.find().where('_id').in(following).exec();
}

module.exports={
   create,
   getAll,
   getById,
   update,
   deleteOne,
   login,
   follow,
   unfollow,
   getfollowers,
   getfollowing
} 