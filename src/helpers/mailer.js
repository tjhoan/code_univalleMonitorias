const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, 
  }
})

let mailOptions = {
  from: process.env.EMAIL_USER,
  to: "toro.jhoan@correounivalle.edu.co",
  subject: "Hello ✔",
  body: "Hello world"
};

module.exports = {
  transporter,
  mailOptions 
};