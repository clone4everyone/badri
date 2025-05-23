const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AdminModel = require("../models/AdminModel.js");
const ejs = require("ejs");
const path = require("path");
const { sendEmail } = require("../utils/sendMail.js");
const crypto = require("crypto");
const { uploadFile } = require("../utils/cloudinary.js");

const createActivationToken = (user) => {
  const token = jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: process.env.ACTIVATION_EXPIRE,
  });
  return token;
};

const sendVerficationEmail = async (user) => {
  const activationToken = createActivationToken(user);
  const activationUrl = `${process.env.SERVER_URL}/api/v1/auth/verify-email?token=${activationToken}`;
  const data = { user: { name: user.name }, activationUrl };
  const html = await ejs.renderFile(
    path.join(__dirname, "../emails/activation-email.ejs"),
    data
  );
  await sendEmail({
    to: user.email,
    subject: "Activate Your Acount",
    html,
  });
};

const register = async (req, res) => {
  try {
    const existingUser = await AdminModel.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    await AdminModel.create(req.body);

    res.status(201).json({
      success: true,
      message: "Account created successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    /* Take the infomation from the form */
    const { email, password } = req.body;

    /* Check if user exists */
    const user = await AdminModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ status: false, message: "user does not exist" });
    }

    /* Compare the password with the hashed password */
    console.log(user.password);
    
    console.log(password)
    // const isMatch = await bcrypt.compare(password, user.password);
    // console.log(isMatch);
    const isMatch= password === user.password ? true : false;
    if (!isMatch) {
       return res
    .status(401)
    .json({ status: false, message: "Invalid Credentials" });
    }
   
    const userData = await AdminModel.findById(user._id).select("-password");
    // Generate The token
    const token = user.generateToken();
    res.json({
      success: true,
      message: "User logged in Successfully",
      token,
      user: userData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const signToken = (data) => {
  const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "10d" });
  return token;
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await AdminModel.findById(req.user._id).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ status: false, message: "user does not exist" });
    }

    res.json({
      success: true,
      message: "User logged in Successfully",
      user,
    });
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .json({ success: false, message: "Failed to get Current User" });
  }
};

const updatePassword = async (req, res) => {
  try {
    const id = req.user._id;
    const { currentPassword, newPassword } = req.body;

    const user = await AdminModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // const isMatch = await bcrypt.compare(currentPassword, user.password);
    const isMatch= currentPassword === user.password ? true:false;
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    // const hashed = bcrypt.hash(newPassword, 10); 
    // user.password = hashed;
    console.log(newPassword);    
   
    user.password=newPassword;
    await user.save();
    res.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Failed to updated password" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const id = req.user._id;
    console.log(req.body)
    // Decode Base64 string to buffer
    if (req.body.image) {
      const base64Data = req.body.image.split(";base64,").pop();
      const buffer = Buffer.from(base64Data, "base64");

      const image = await uploadFile(buffer, "placedIn/teacher/exam");
      req.body.avatar = image.url;
    }

    const user = await AdminModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await AdminModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Failed to updated password" });
  }
};

// Passowrd forgot------------------------>

// Send reset password email
const sendResetPassword = async (req, res, next) => {
  const { email } = req.body;
  const user = await AdminModel.findOne({ email });

  if (!user) return res.status(400).json({ message: "User not registered" });

  const resetToken = crypto.randomBytes(20).toString("hex");
  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  console.log(resetToken);
  const resetUrl = `${process.env.ADMIN_URL}/auth/reset-password/${resetToken}`;
  const html = await ejs.renderFile(
    path.join(__dirname, "../emails/resetPassword.ejs"),
    { name: user.name, resetUrl }
  );

  await sendEmail({ to: user.email, subject: "Password Reset", html });
  await user.save();

  res.status(200).json({ message: "Please check your mail" });
};

// Reset password using token
const resetPassword = async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await AdminModel.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user)
    return res.status(400).json({ message: "Invalid or expired token" });

  const { password, confirmPassword } = req.body;
  if (!password || !confirmPassword || password !== confirmPassword) {
    return res
      .status(400)
      .json({ message: "Passwords do not match or are missing" });
  }
  
  // user.password = await bcrypt.hash(password, 10);
  user.password=password;
  console.log(user.password);
  
  // user.password = await
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  const html = await ejs.renderFile(
    path.join(__dirname, "../emails/passwordSuccessfull.ejs"),
    { user }
  );
  await sendEmail({ to: user.email, subject: "Password Reset Success", html });


  res.status(200).json({ message: "Password has been updated successfully" });
};

module.exports = {
  register,
  login,
  updatePassword,
  resetPassword,
  sendResetPassword,

  getCurrentUser,
  updateProfile,
};
