var express = require("express");
var router = express.Router();
const nodemailer = require("nodemailer");
var Issue = require("../../models/Issue");
var Notification = require("../../models/Notification");
const ntfsController = require("../../controller/notification.controller").notify;
var auth = require("../../utils/verifyToken");

// router.use(auth.verifyToken);

router.get("/notification", ntfsController.getNotification);

// List all the issues raised by all users
router.get("/", auth.verifyToken, (req, res) => {
  // fetch  allissue from database and send it in response
  Issue.find({})
    .sort({ createdAt: -1 })
    .populate("createdBy")
    .exec((err, issues) => {
      if (err) res.status(500).json(err);
      // console.log(issues, "all issues");
      res.status(200).json({ success: true, Issues: issues });
    });
});

router.post("/mail", (req, res) => {
  const id = req.body.issue._id;

  const smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "alt.issuetrackr@gmail.com",
      pass: process.env.PASS
    }
  });

  Issue.findOne({ _id: id })
    .populate("createdBy")
    .select("-password")
    .exec((err, issue) => {
      if (err) {
        return res.json(err);
      } else {
        let mailOptions = {
          to: process.env.EMAIL,
          subject: `${issue.createdBy[0].firstname} ${issue.createdBy[0].lastname} created a issue`,
          html: `The issue is <br>${issue.title}<br>${issue.description}`
        };
        smtpTransport.sendMail(mailOptions, (err, info) => {
          if (err) {
            return res.status(406).json({
              error: "Encountered a problem while sending the invitation email"
            });
          }
          return res.json({
            success: true
            // message: `Invitation email sent to ${mailOptions.to}`});
          });
        });
      }
    });
});

// create Issue
router.post("/", auth.verifyToken, (req, res) => {
  // fetch Issues data in req.body
  // save it to database using model
  const {
    title,
    description,
    category,
    isUrgent,
    createdBy,
    imgUrl
  } = req.body;
  const newIssue = new Issue({
    title,
    description,
    category,
    createdBy,
    isUrgent,
    images: imgUrl
  });
  newIssue.save((err, createdIssue) => {
    if (err) return res.json(err);
    else {
      const id = req.user._id;
      newNotification = new Notification({
        user: id,
        issue: createdIssue._id
      });
      newNotification.save((err, notification) => {
        // console.log(notification, 'notification');
        if (err) {
          return res.json(err);
        } else {
          return res.status(200).json({
            success: true,
            issue: createdIssue,
            notification
          });
        }
      });
    }
  });
});

// fetch single issue
router.get("/:id", (req, res) => {
  // fetch issue details from database using id and send it in response
  var id = req.params.id;
  Issue.findById(id)
    .populate("createdBy")
    .exec((err, issue) => {
      if (err) return res.json(err);
      res.status(201).json({ issue: issue });
    });
});

// Update a Issue
router.put("/:id", (req, res) => {
  // capture updated data using req.body
  // update Issue
  var id = req.params.id;
  Issue.findByIdAndUpdate(id, req.body, { new: true }, (err, issue) => {
    if (err) return res.json(err);
    res.status(201).json({ issue: issue });
  });
});

// only for admin

// delete Issue
router.delete("/:id", (req, res) => {
  // delete a Issue
  var id = req.params.id;
  Issue.findByIdAndRemove(id, req.body, (err, issue) => {
    if (err) return res.json({ success: false, message: "server error" });
    res.status(201).json({ issue: issue });
  });
});

module.exports = router;
