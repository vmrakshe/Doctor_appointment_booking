import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
//import Joi from "joi";

import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role }, // Payload(data): Embed user ID and role
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "14d",
    }
  );
};

// register user controller
export const register = async (req, res) => {
  // destructure the data from request body
  const { email, password, name, role, photo, gender } = req.body;

  // Validation
  // const schema = Joi.object({
  //   name: Joi.string().min(3).max(30).required(),
  //   photo: Joi.string().required(),
  //   email: Joi.string().email().required(),
  //   password: Joi.string().min(8).required(),
  //   gender: Joi.string().valid("male", "female", "other").required(),
  //   role: Joi.string().valid("patient", "doctor", "admin").required(),
  // });
  // const { error } = schema.validate(req.body);
  // if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    let user = null;

    // check the user role
    if (role === "patient") {
      user = await User.findOne({ email });
    } else if (role === "doctor") {
      user = await Doctor.findOne({ email });
    } else if (role === "admin") {
      const existingAdmin = await Doctor.findOne({ role: "admin" });
      if (existingAdmin) {
        return res.status(400).json({ message: "Admin already exists" });
      }
    }

    // check if user exist
    if (user) {
      return res.status(400).json({ message: "User already exist" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10); //Generates a cryptographically random string called a salt.
    const hashPassword = await bcrypt.hash(password, salt); //hashed string looks like  $<algorithm>$<cost>$<salt><hash>

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      if (role === "patient") {
        user = new User({
          name,
          email,
          password: hashPassword,
          photo,
          gender,
          role,
        });
      }
      if (role === "doctor" || role === "admin") {
        user = new Doctor({
          name,
          email,
          password: hashPassword,
          photo,
          gender,
          role,
        });
      }
      await user.save({ session });
      await session.commitTransaction();

      res
        .status(201)
        .json({ success: true, message: "Registration done successfully ! " });
    } catch (error) {
      await session.abortTransaction();
      throw error;
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error, Try Again" });
  }
};

// login controller
export const login = async (req, res) => {
  const { email } = req.body;

  try {
    let user = null;
    const patient = await User.findOne({ email });
    const doctor = await Doctor.findOne({ email });

    if (patient) {
      user = patient;
    }
    if (doctor) {
      user = doctor;
    }

    // check if user exist or not
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    // compare password
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    ); //salt->hash the user given password->compare to hashed password

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Credentials" });
    }

    // get token
    const token = generateToken(user);
    const { password, role, appointments, ...rest } = user._doc;

    res.status(200).json({
      status: true,
      message: "Successfully Login",
      token,
      data: { ...rest },
      role,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: "Failed To Login" });
  }
};
