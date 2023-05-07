const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sequelize = require("../config/db");
const User = require("../models/User")(sequelize);
require("dotenv").config();
const nodemailerService = require("../services/nodemailerService");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });

    // Send email to user
    const resetPasswordLink = `http://${req.headers.host}/reset-password/${token}`;
    const displayLink = "Reset password here";
    const subject = "Password Reset Request";
    const template = "reset-password";
    const context = { user, resetPasswordLink, displayLink };

    await nodemailerService.sendMail(user.email, subject, template, context);
    res.status(200).json({
      message: "Password reset link has been sent to your email address",
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

    //notify user that password is reset successfully
    const subject = "Password Reset Successfully";
    const template = "reset-password-success";
    const context = { user };
    await nodemailerService.sendMail(user.email, subject, template, context);

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

exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const decodedToken = jwt.verify(req.body.token, JWT_SECRET);
    const user = await User.findOne({ where: { id: decodedToken.id } });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(
      oldPassword,
      user.password_hash
    );

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Old password is incorrect" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Update user password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password_hash = hashedPassword;
    await user.save();

    //notify user that password is changed successfully
    const subject = "Password Changed Successfully";
    const template = "change-password-success";
    const context = { user };
    await nodemailerService.sendMail(user.email, subject, template, context);

    res.status(200).json({ message: "Password has been changed successfully" });
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      res.status(400).json({ error: "Invalid token" });
    } else {
      res.status(500).json({ error: "Error processing the request" });
    }
  }
};
