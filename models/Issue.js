var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var issueSchema = new Schema({
  title: {
    type: String
  }, 
  description: {
    type: String
  },
  category: {
    type : [String]
  },
  createdAt: {
    type: Date,
  },
  isResolved:{
    type: Boolean,
		default: false,
  },
  isUrgent:{
    type: Number,
    enum: [0, 1, 2, 3]
  },
  createdBy: [{ type: Schema.Types.ObjectId, ref: 'User'}]
}, {timestamps: true});

var Issue = mongoose.model("Issue", issueSchema);

module.exports = Issue;