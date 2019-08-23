const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const NotificationSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    issue: { type: Schema.Types.ObjectId, ref: 'Issue' }
})

module.exports = mongoose.model('Notification', NotificationSchema);