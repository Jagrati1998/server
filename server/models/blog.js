let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let blogSchema = new Schema({
  name: {
    type: String
  },
  
  blog: {
    type: String
  },
  
}, {
    collection: 'blogs'
  })

module.exports = mongoose.model('blog', blogSchema)