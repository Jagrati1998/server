
let mongoose = require('mongoose');
const express = require('express');
  
const router = express.Router();
const multer  = require('multer')
const path = require("path");
const { v4: uuidv4 } = require('uuid');
// user Model
const PORT = 4000;
let datauserSchema = require('../models/user')
let datauser = require('../models/user');


const DIR = './public/images/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});


router.post('/add-user', upload.single('profileImg'),async (req, res, next) => {
  const url = req.protocol + '://' + req.get('host')
  const user = new datauser({
      _id: new mongoose.Types.ObjectId(),
      fname: req.body.fname,
      lname: req.body.lname,
      dob: req.body.dob,
      email: req.body.email,
      password: req.body.password,
     // imagepath: url + '/public/images/' + req.file.filename
      imagepath:   "/home/jagrati/usernex/server"+'/public/images/' + req.file.filename
  });
  await user.save().then(result => {
      res.status(201).json({
          message: "User registered successfully!",
          userCreated: {
              _id: result._id,
              imagepath: result.imagepath
          }
      })
  }).catch(err => {
      console.log(err),
          res.status(500).json({
              error: err
          });
  })
})






// READ Users
router.route('/').get((req, res) => {
  datauserSchema.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
     // res.json("inserted")
    }
  })
})

// Get Single User
router.get("/getuser/:id",async(req,res)=>{
  try {
      console.log(req.params);
      const {id} = req.params;

      const userindividual = await datauser.findById({_id:id});
      console.log(userindividual);
      res.status(201).json(userindividual)

  } catch (error) {
      res.status(422).json(error);
  }
})

// router.route('/get-user/:id').get((req, res) => {
//   datauserSchema.findById(req.params.id, (error, data) => {
//     if (error) {
//       return next(error)
//     } else {
//       res.json(data)
//     }
//   })
// })

// Update User

router.route('/update-user/:id').put((req, res, next) => {
  datauserSchema.findByIdAndUpdate(
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
  datauserSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({
        msg: data,
      })
    }
  })
})

module.exports = router;