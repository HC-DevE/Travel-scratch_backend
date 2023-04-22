const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const sequelize = require("../config/db");
const User = require("../models/User")(sequelize);
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        // type: "OAuth2", // Google Gmail API v1
        user: process.env.NODEMAILER_USER_EMAIL,
        pass: process.env.NODEMAILER_PSSWD,
        // clientId: process.env.OAUTH_CLIENT_ID,
        // clientSecret: process.env.OAUTH_CLIENT_SECRET,
        // refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        // accessToken: process.env.OAUTH_ACCESS_TOKEN,
      },
    });

    const mailOptions = {
      from: "admin@travel-scratch.fr",
      to: user.email,
      subject: "Password Reset",
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\nhttp://${req.headers.host}/reset-password/${token}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ error: "Error sending the password reset email" });
      }

      res.status(200).json({ message: "Password reset email sent" });
    });
  } catch (error) {
    res.status(500).json({ error: "Error processing the request" });
    console.log(error.message);
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword, token } = req.body;

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const decodedToken = jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({ where: { id: decodedToken.id } });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Update user password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password_hash = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password has been reset successfully" });
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      res
        .status(400)
        .json({ error: "Password reset token is invalid or has expired" });
    } else {
      res.status(500).json({ error: "Error processing the request" });
    }
  }
};