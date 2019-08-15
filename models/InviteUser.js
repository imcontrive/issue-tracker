var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var inviteSchema = new Schema({
	email:{
    type: String,
    required: true
	},
	refCode: {
    type: String,
    required: true
  }
});


var InviteUser = mongoose.model("InviteUser", inviteSchema);

module.exports = InviteUser ;