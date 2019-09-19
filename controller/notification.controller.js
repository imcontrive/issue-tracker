const Notification = require("../models/Notification");

let socketIo;
module.exports.notify = {
  getNotification: (req, res) => {
    Notification.find({})
      .populate("issue")
      .exec((err, notifications) => {
        if (err) {
          return res.status(500).json(err);
        } else {
          return res.json({
            success: true,
            notifications
          });
        }
      });
  }
};
