var express = require('express');
var router = express.Router();
var userRouter = require('./users');
var issueRouter = require('./issue');
var inviteRouter = require('./inviteusers');



router.use('/users', userRouter);
router.use('/issues', issueRouter);
router.use('/invites', inviteRouter);



/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({success: true, message: 'Welcome to Node APIs'});
});



module.exports = router;
