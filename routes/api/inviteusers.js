var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();
// var User = require('../../models/User');
var InviteUser = require('../../models/InviteUser');

router.post('/', (req, res) => {
  console.log(req.body,"inviteUsers")
  const smtpTransport = nodemailer.createTransport({
		service: "Gmail",
		auth: {
			user: 'alt.issuetrackr@gmail.com',
			pass: process.env.PASS
		}
  });
  
	let rand, mailOptions, host, link;
	// generate random ref code
	function randomN(v) {
		rand = [];
		let alphaNum = 'abcdefghijklmnopqrstuvwxyz0123456789';
		for (let i = 0; i < v; i++) {
			let random = Math.floor(Math.random() * 36);
			rand.push(alphaNum[random])
		}
		return rand.join('');
  }
  
	// it'll provide your localhost or network address
	host = req.get("host");
	let refCode;
		refCode = randomN(6);
		link = `http://${host}/register?ref=${refCode}`;
    const { email } = req.body;
    
    //creating new Users
		const newUser = {
			email: email,
			refCode: refCode
    }

    console.log(refCode, newUser, "...............................")
  
    //create users in db
    InviteUser.create(newUser, (err, newUser) => {
      console.log('created newUser', newUser)
      if(err) return res.status.json({success:false, error});

      if(newUser) {
        //send email for validation
        mailOptions = {
          to: email,
          subject: "You've been invited to join issue-trackr",
          html: `Hello, <br>You've been invited to join issueTrackr.<br><br>Please <a href='${link}'>click here</a> to join.<br><br>Regards,<br>issue-Trackr`
        }
        smtpTransport.sendMail(mailOptions, (err, info) => {
          console.log("err in check",err);
          if (err) return res.status(406).json({ error: "Encountered a problem while sending the invitation email" });
          if(info) {
            return res.status(200).json({
              success: true,
              message: `Invitation email sent to ${mailOptions.to}`});
          };
        }
        )}

    })

})


router.get('/:refCode', (req, res) => {
  const { refCode } = req.params;
  InviteUser.findOne({ refCode: refCode }, (err, user) => {
    console.log(user, "..........................")
    if(err) return res.status(400).json({success:false, error:"Invalid refCode"});
    if(user) return res.status(200).json({success:true,user: user});
  });

})

module.exports = router;