const nodemailer = require('nodemailer');


exports.Transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'tabatarecover@gmail.com', // generated ethereal user
      pass: 'wcksggajywnfepjd', // generated ethereal password
    },
});


