const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

async function sendMail(mailTo, mailSubject, mailTemplate, mailContext) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.NODEMAILER_USER_EMAIL,
      pass: process.env.NODEMAILER_PSSWD,
    },
  });

  // Load HTML template file
  const html = await ejs.renderFile(
    path.join(__dirname, "templates", `${mailTemplate}.ejs`),
    mailContext
  );

  const mailOptions = {
    from: process.env.NODEMAILER_USER_EMAIL,
    to: mailTo,
    subject: mailSubject,
    html: html,
  };

  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      console.log(err);
      return err;
    }
  });
}

module.exports = { sendMail };
