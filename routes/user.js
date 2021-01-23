const express= require('express');
const{create,getAll,getById,update,deleteOne,login,follow ,getfollowers, getfollowing}=require('../controllers/user')
const router=express.Router();
const mongoose=require('mongoose')
const userr=require('../models/users')
const auth = require('../middlewares/auth')

const multer=require('multer')
const storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'./uploads/')
  },
  filename:function(req,file,cb){
    cb(null,Date.now() + '-' + file.originalname)
  }
})
const upload=multer({storage:storage })
/*router.post('/', upload.single('blogImg'),async (req, res, next) => { 
  const user=new userr({
    username:req.body.username,
    password:req.body.password,
     blogImg:req.file.path
  })
  user.save().then(ress=>{
    res.json({user})
  })
  .catch(e => next(e));
  
 });*/
 router.post('/',async (req, res, next) => { 
  const { body } = req;
 try {
   const user = await create(body);
   res.json(user);
 } catch (e) {
   next(e);
 }
});
  router.get('/', async (req, res, next) => {
    try {
      const user = await getAll(); 
      res.json(user);
    } catch (e) {
      next(e);
    }
  });
  router.get('/:id', async (req, res, next) => {
      const {params : {id} }=req
    try {
      const user = await getById(id);
      res.json(user);
    } catch (e) {
      next(e);
    }
  });
  router.get('/followers/:id', async (req, res, next) => {
    const {params : {id} }=req
  try {
    const user = await getfollowers(id);
    res.json(user);
  } catch (e) {
    next(e);
  }
});
router.get('/following/:id', async (req, res, next) => {
  const {params : {id} }=req
try {
  const user = await getfollowing(id);
  res.json(user);
} catch (e) {
  next(e);
}
});
  router.patch('/:id', async (req, res, next) => {
    const {params : {id},body }=req
  try {
    const user = await update(id,body);
    res.json(user);
  } catch (e) {
    next(e);
  }
});
router.delete('/:id', async (req, res, next) => {
    const { params: { id } } = req;
    try {
      const users = await deleteOne(id);
      res.json(users);
    } catch (e) {
      next(e);
    }
  });
  router.post('/login',async(req,res,next) =>{
    const { body }=req;
    try{
      const user= await login(body)
      res.json(user)
    }catch(e){
      next(e)
    }
  })
  router.post('/follow/:userid',auth,async(req,res,next)=>{
    let {user :{id},params:{userid}}=req
    try{
    //  const user=await up(userid)
      const  user = await follow(id,userid);
      res.json(user)
    }catch(e){
      next(e)
    }
  })
  router.post('/unfollow/:userid',auth,async(req,res,next)=>{
    let {user :{id},params:{userid}}=req
    try{
    //  const user=await up(userid)
      const  user = await unfollow(id,userid);
      res.json(user)
    }catch(e){
      next(e)
    }
  })
module.exports=router;
