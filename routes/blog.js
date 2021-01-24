const express= require('express');
const{create,getAll,getBytitle,update,deleteOne,getBlogs }=require('../controllers/blog')
const router=express.Router();
const authMiddleware=require('../middlewares/auth')

const app = express();


const mongoose=require('mongoose')
const Blog=require('../models/blogs')

const multer=require('multer')
const storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'./uploads/')
  },
  filename:function(req,file,cb){
    cb(null,Date.now() + '-' + file.originalname)
  }
});
const filterFile=(req,res,cb) =>{
  if(file.mimetype==='image'){
    cb(null,true);
  }else{
    cb(null,false)
  }
}
const upload=multer({storage:storage })


router.post('/', upload.single('blogImg'),async (req, res, next) => { 
  const {body,file,user:{id,username}}=req
  body.blogImg=file.path
  try {
    const user = await create({...body,userId:id,Author:username});
    res.json(user);
  } catch (e) {
    next(e);
  }

 /* const blog=new Blog({
    title:req.body.title,
     blogImg:req.file.path,
     userId:req.user.id,
     tags:req.body.tags
  })
  blog.save().then(ress=>{
    res.json({blog})
  })
  .catch(e => next(e));*/
  
 });


/*router.post('/', upload.single('product'),async (req, res, next) => { 
     const { body ,user:{ id }} = req;
    try {
      const user = await create({...body,userId:id});
      res.json(user);
    } catch (e) {
      next(e);
    }
  });*/
  router.get('/', async (req, res, next) => {
    const { user : { id } } = req
    try {
      const user = await getAll({userId:id}); 
      res.json(user);
    } catch (e) {
      next(e);
    }
  });

  router.get('/:title', async (req, res, next) => {
      const {params : {title} }=req
    try {
      const user = await getBytitle(title);
      res.json(user);
    } catch (e) {
      next(e);
    }
  });
  router.get('/search', async (req, res, next) => {
    let { query: { author, body, title, tag, limit, skip } } = req;
    let _query = {}
    if (title != undefined)
      _query.title = { $regex: "^" + title }
    if (tag != undefined)
      _query.tags = tag
    if (body != undefined)
      _query.body = { $regex: "." + body + "." }
    if (limit == undefined || limit == '')
      limit = 10
    if (skip == undefined)
      skip = 0
    let _pagination = { limit: Number(limit), skip: Number(skip) }
    try {
      const blogs = await getBlogs(_query, _pagination, author) //check in controller if author undefined\
      res.json(blogs);
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
router.delete('/:blogid', async (req, res, next) => {
  debugger
    const { params: { blogid } ,user:{id}} = req;
    try {
      const users = await deleteOne(blogid,id);
      res.json(users);
    } catch (e) {
      next(e);
    }
  });
module.exports=router;
