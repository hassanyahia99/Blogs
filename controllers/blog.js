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
const { getUsers } = require('../controllers/user');

const getBlogs = async (query, pagination, author) => {
    if (author == undefined)
        return blogModel.find(query).sort([['updatedAt',-1]]).limit(pagination.limit).skip(pagination.skip).exec();
    else {
        const foundUsers = await getUsers(author)
        let blogsIds = []
        foundUsers.forEach(u => {
            blogsIds.push(...u.blogs)
        })
        console.log(...blogsIds)
        return blogModel.find(query).where('_id').in(blogsIds)
            .limit(pagination.limit).skip(pagination.skip).exec();
    }
}

module.exports={
   create,
   getAll,
   getBytitle,
   update,
   deleteOne,
   saveimg,
   getBlogs
} 