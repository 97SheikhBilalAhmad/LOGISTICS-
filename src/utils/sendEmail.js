// utils/sendEmail.js
var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");

module.exports = async (email, emailSubject, emailBody) => {
  try {
    var transporter = nodemailer.createTransport(
      smtpTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        auth: {
          user: "sheikhbilalahmad839@gmail.com",
          pass: "yhlq kyws jyag gtpv",
        },
      })
    );

    // Setup email options
    const mailOptions = {
      from: "sheikhbilalahmad839@gmail.com",
      to: email,
      subject: emailSubject,
      text: emailBody,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("=======>>>>>>>>", error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    // Send email
    // smtpTransport.sendMail(mailOptions, (res, req) => {
    //   if (error) {

    //     console.log('=======>>>>>>>>.',error);
    //   }
    // });

    console.log("Email sent successfully to:", email);

    // Redirect after successful email send
    //res.redirect('/');
  } catch (error) {
    console.error("Error sending email:", error);
    // Handle the error appropriately or propagate it to the calling function
    throw error;
  }
};


