const nodemailer = require('nodemailer');

exports.mailSender = (otp, email) => {
     var transporter = nodemailer.createTransport({
        service: process.env.SERVICE,
        auth: {
          user:  process.env.USER,
          pass: process.env.PASSWORD
        }
      });
      
      var mailOptions = {
        from: process.env.USER,
        to: email,
        subject: `Mail verify form the APEX-HUB`,
        text: `Your mail varification OTP  is  ${otp}`
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}