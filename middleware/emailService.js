const nodemailer = require("nodemailer");
const db = require("../config/db");
require("dotenv").config();

var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secureConnection: false,
    port: 587,
    auth: {
        user: process.env.DB_EMAIL_USERNAME,
        pass: process.env.DB_EMAIL_PASSWORD
    }
});

transporter.verify((err) => {
    if (err) {
        console.log("Email Service is Failed");
    } else {
        console.log("Email Service is Successful")
    }
});

module.exports = transporter;

