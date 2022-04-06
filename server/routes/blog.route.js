
const express = require('express');
let mongoose = require('mongoose');
const  blogRoutes = express.Router(); 
// user Model
let blogSchema = require('../models/blog')

// Create user
blogRoutes.post('/add-blog', (req, res, next) => {
  console.log(req.body);//just for checking
  console.log(res.body);//just for---------
  blogSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log("jj");
     // res.json(data)
     res.json("inserted")
    }
  })
})

// READ Users
blogRoutes.route('/blog').get((req, res) => {
  blogSchema.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
     // res.json("inserted")
    }
  })
})
blogRoutes.route('/blog').get((req, res) => {
  blogSchema.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
     // res.json("inserted")
    }
  })
})
blogRoutes.route('/delete-blog/:id').delete((req, res, next) => {
  blogSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({
        msg: data,
      })
    }
  })
})
/*Get Single User
router.route('/get-user/:id').get((req, res) => {
  userSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update User
router.route('/update-user/:id').put((req, res, next) => {
  userSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error)
        console.log(error)
      } else {
        res.json(data)
        console.log('user updated successfully !')
      }
    },
  )
})

// Delete User
router.route('/delete-user/:id').delete((req, res, next) => {
  userSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({
        msg: data,
      })
    }
  })
})
*/
module.exports = blogRoutes;