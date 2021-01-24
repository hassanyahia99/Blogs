const mongoose=require('mongoose')
const {Schema}=mongoose;
const blogSchema = new Schema({
    title:{
        type: String,
        required: true,
        maxLength: 140,
    },    
    body:{
        type:String,
        maxlength:140,
        required:true
    },
    tags:[String],
    blogImg:{
        type: String,
        required:true
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    Author:{
        type:String
    }
})
const blogModel = mongoose.model('Blog', blogSchema);
 module.exports = blogModel;