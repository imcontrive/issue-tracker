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
    type : [String],
  },
  isResolved:{
    type: Boolean,
		default: false,
  },
  isUrgent:{
    type: String,
    // default:"check"
  },
  createdBy: [{ type: Schema.Types.ObjectId, ref: 'User'}],
  images: [{ type: String }]
}, {timestamps: true});



var Issue = mongoose.model("Issue", issueSchema);

// console.log(Issue.schema.path("isUrgent").enumValues, 'check')

module.exports = Issue;