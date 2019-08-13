var express = require('express');
var router = express.Router();
var Issue = require('../../models/Issue');
var auth = require('../../utils/verifyToken');

router.use(auth.verifyToken);

// List all the issues raised by all users
router.get('/',auth.verifyToken, (req, res) => {
  // fetch  allissue from database and send it in response
  Issue.find({}).sort({createdAt: -1 }).exec((err, issues) => {
    if(err) res.status(500).json(err);
    res.status(200).json({ success: true, Issues: issues})
  })
})

// create Issue
router.post('/', (req, res) => {
  // fetch Issues data in req.body
  // save it to database using model
  console.log(req.body);
  Issue.create(req.body, (err, issue) => {
    if(err) return res.json(err);
    res.status(201).json({issue: issue});
  })
})

// fetch single issue
router.get('/:id', (req, res) => {
  // fetch issue details from database using id and send it in response
  var id = req.params.id;
  Issue.findById(id, (err, issue) => {
    if(err) return res.json(err);
    res.status(201).json({issue: issue})
  })
})

// Update a Issue
router.put('/:id', (req, res) => {
  // capture updated data using req.body
   // update Issue
  var id = req.params.id;
  Issue.findByIdAndUpdate(id,req.body,{new: true} ,(err, issue) => {
    if(err) return res.json(err);
    res.status(201).json({issue: issue});
  })
})

// only for admin

// delete Issue
router.delete('/:id', (req, res) => {
  // delete a Issue
  var id = req.params.id;
  Issue.findByIdAndRemove(id,req.body ,(err, issue) => {
    if(err) return res.json({success: false,message: "server error"});
    res.status(201).json({issue: issue})
  })
})


module.exports = router;
