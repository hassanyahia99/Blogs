const mongoose = require('mongoose');
const bcrypt =require('bcrypt')
const{Schema} = mongoose;

const userSchema = new Schema({
    username: {
      type: String,
      unique: true,
      required: true,
      maxLength: 140,
    },
    blogImg:{
      type: String,
  },
    password: {
      type: String,
      required: true,
    },
    email:{
      type:String,
      lowercase:true,
      unique:true,
     // required:true,
      match:[/\s+@\s+\.\s+/]
    },
    firstname: {
      type: String,
      maxLength: 140,
    },
    lastname:{
      type:String,
      maxlength:140
    },
    follower:[{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    following:[{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    dob: Date,
  },
  {
    toJSON: {
      transform: (doc, ret, options) => {
        delete ret.password;
        return ret;
      },
    },
  });
  userSchema.pre('save', function preSave(next) {
    this.password = bcrypt.hashSync(this.password, 8);
    next();
  });
  userSchema.pre('findOneAndUpdate', function preSave(next) {
    if (!this._update.password) {
      next();
    }
    this._update.password = bcrypt.hashSync(this._update.password, 8);
    next();
  });
  userSchema.methods.validatepassword= function validatepassword(password){
   return bcrypt.compareSync(password,this.password)
  }
 const userModel = mongoose.model('User', userSchema);
 module.exports = userModel;