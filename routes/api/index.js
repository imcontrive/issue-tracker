var express = require('express');
var router = express.Router();
var userRouter = require('./users');
var issueRouter = require('./issue');



router.use('/users', userRouter);
router.use('/issues', issueRouter);



/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({success: true, message: 'Welcome to Node APIs'});
});



module.exports = router;
