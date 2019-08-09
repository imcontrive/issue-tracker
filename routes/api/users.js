var express = require('express');
var router = express.Router();
var User = require('../../models/User');
var auth = require('../../utils/verifyToken');


// import bcrypt for password
var bcrypt = require('bcrypt');

// import jwt for tokens
var jwt = require('jsonwebtoken');


// routes for user registration
router.post('/register', (req, res) => {
  User.create(req.body, (err, user) => {
    console.log(req.body, 'register')
    if(err) return res.json(err);
    jwt.sign({userId: user.id}, "process.env.SECRET", (err, token) => {
      if(err) return res.json({succees: false});
      return res.status(201).json({success:true, message: "user registered" ,token: token});
    })
  })
})

router.get('/me',auth.verifyToken, (req,res) => {
  console.log(req.user, "/me....")
  User.findById(req.user._id, (err, user) => {
    if(err) return res.json({success:false, err });
    return res.status(201).json({ success:true, user: user });
  })
})

router.post('/login', (req, res) => {
  console.log(process.env.SECRET);
  const data = req.body;
  User.findOne({ email: data.email }, (err, user) => {
    if (err) return res.status(500).json({ success: false, error: "server error" });
    if(!user) {
      return res.status(400).json({ success: false, error: "user not found" });
    }
    if(user){
      var result = bcrypt.compareSync(data.password, user.password);
      if(result){
        var token = jwt.sign({ _id: user._id }, process.env.SECRET);
        return res.status(200).json({success: true,token: token, user});
      }else {
        return res.status(400).json({success: false, error: "invalid password" });
      }
    }
 })
})

router.use(auth.verifyToken);

/* GET users listing. */
router.get('/', function(req, res, next) {

  User.find()
  .sort({score: -1})
  .exec((err, users) => {
    if(err) res.status(500).json({ success: false, err });
    res.status(200).json({ success: true, users: users });
  })
});

// singleUser
router.get('/:id', function(req, res, next) {
  User.findById(req.params.id , (err,user)=> {
    if(err) return res.status(500).json({success:false, message: "server error",err});
    if(user){
      return res.status(200).json({success: true, message:"", user});
    }
  })
});


// user edit and update
router.put('/update/:id', function(req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true } ,(err,user)=> {
    if(err) return res.status(500).json({success:false, message: "server error",err});
    if(user){
      return res.status(200).json({success: true, message:"user updated", user});
    }
  })
});



// delete users
router.delete('/:id', function(req, res, next) {
  User.findByIdAndRemove(req.params.id,req.body ,(err,user)=> {
    if(err) return res.status(500).json({success:false, message: "server error",err});
    if(user){
      return res.status(200).json({success: true, message:"user updated", user});
    }
  })
});


module.exports = router;