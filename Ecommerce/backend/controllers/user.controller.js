const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName, mobileNo, gender } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User is already registered",
      });
    }

    await UserModel.create({
      email,
      password,
      firstName,
      lastName,
      mobileNo,
      gender,
    });
    res.json({
      success: true,
      message: "User register successfully",
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        success: true,
        message: "Email already exist !",
      });
    }
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (email === "" || password === "") {
      res.status(404).json({
        success: false,
        message: "Input fields can't be empty",
      });
    }
    if (!user) {
      res.json({
        success: false,
        message: "User not register. Please create user first",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const currentTimeSec = Number(Date.now() / 1000);

      const tokenData = {
        iat: currentTimeSec, // initiated time
        // exp: currentTimeSec + 60 * 60, // expired time
        _id: user._id,
      };

      const token = jwt.sign(tokenData, process.env.JWT_SECRET_ID, { expiresIn : "2d"});
      // add token on db
      await UserModel.findByIdAndUpdate(user._id, { token: token });

      res.cookie("token",token);
      res.json({
        success: true,
        message: "Login successfully",
        token: token,
      });
      return;
    } else {
      res.json({
        success: false,
        message: "Password not valid",
      });
    }
  } catch (error) {
    next(error);
  }
};

const userControllers = {
  register,
  login,
};

module.exports = userControllers;
