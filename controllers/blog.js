const Blog=require('../models/blogs')
const saveimg =(img) => Blog.product = img.path.exec()
const create = (user) => Blog.create(user);
const getAll =(query) => Blog.find(query).exec()
const getBytitle = (title) => Blog.find({title}).exec()
const update =(id,data) => Blog.findByIdAndUpdate(id,data , {new:true})
const deleteOne= (id,userid) =>{ 
   myblog=Blog.findById(id,function(err,res){
      try{
         if(res.userId==userid){
            Blog.findByIdAndRemove(id).exec()
         }
      }
     catch{
        return("notfound")
     }
   })
   return("deleted")
} 

module.exports={
   create,
   getAll,
   getBytitle,
   update,
   deleteOne,
   saveimg
} 