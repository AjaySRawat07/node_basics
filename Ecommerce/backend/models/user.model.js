const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchemaObject = {
  email: {
    type: String,
    required: [true, "Email must be required"],
    unique: true,
    lowercase: true,
    validate: {
      validator: function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "Invalid email address format",
    },
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: [true, "First name required"],
    validate: {
      validator: function (value) {
        return !/^\d/.test(value);
      },
      message: "Name can't started with number",
    },
  },
  lastName: {
    type: String,
    required: false,
    default: "NA",
  },
  mobileNo: {
    type: String,
    validate: {
      validator: function (v) {
        return /\d{10}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, "User phone number required"],
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female", "Other"],
  },
  token: {
    type: String,
    required: false,
    default: "",
  },
  isActive: { 
    type: Boolean, 
    default: true 
  },
  role : {
    type : String,
    default : "CUSTOMER",
    enum : ["ADMIN","CUSTOMER","SELLER","SUPER-ADMIN"]
  }

};

const userSchema = new mongoose.Schema(userSchemaObject,{timestamps : true});

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(this.password, salt);
  this.password = encryptedPassword;
});

const UserModel = mongoose.model("Users", userSchema);

module.exports = UserModel;
