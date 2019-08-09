var jwt = require('jsonwebtoken');
var User = require('../models/User');

exports.verifyToken = (req,res,next) => {
  const token = req.headers['Authorization'] || req.headers['authorization'] || null;

  if (!token) return res.json({ message: 'unAuthorized user' });
  const BearerToken = token.split(' ');
  const headerBearer = BearerToken[1];
  jwt.verify(headerBearer, process.env.SECRET, (err, decoded) => {
    if (err) return res.json({
      success: false,
      message: 'Send proper token dude'
    }) 
    console.log("decoded data testing",decoded);
    req.user = decoded;
    next();
  })
}

exports.isUserLoggedIn = (req,res) => {
  const token = req.headers['Authorization'] || req.headers['authorization'] || null;

  if (!token) return res.json({ message: 'unAuthorized user' });
  const BearerToken = token.split(' ');
  const headerBearer = BearerToken[1];
  jwt.verify(headerBearer, process.env.SECRET, (err, decode) => {
    if (err) return res.json({
      unVerified:true,
      message: 'Send proper token dude'
    }) 
    console.log("decoded data testing",decode);
    User.findOne({ _id: decode._id }, (err , user) => {
        if(err) return res.status(500).json({ success:false, message: "server error", err });
        if(user) return res.status(200).json({ success: true, message:"", user });
      });
  })
}
