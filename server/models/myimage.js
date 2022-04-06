let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let userSchema = new Schema({
  fname: {
    type: String,//required: true
  },
  lname: {
    type: String,//required: true
  },
  dob: {
    type: Date,//required: true
  },
  email: {
    type: String,//unique: true, required: true
  },
  
  fileName: { 
    type: String
   
}

},

 {
    collection: 'users'
  })
  //{ timestamps: true } copy from user.js
module.exports = mongoose.model('user', userSchema)