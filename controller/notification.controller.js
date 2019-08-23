const Notification = require("../models/Notification");

let socketIo;
module.exports.notify = io => {
  socketIo = io;
  return {
    getNotification: (req, res) => {
      Notification.find({})
        .populate("issue")
        .exec((err, notifications) => {
          if (err) {
            return res.status(500).json(err);
          } else {
            socketIo.emit('notification', notifications);
            return res.json({
              success: true,
              notifications
            });
          }
        });
    }
  };
};
