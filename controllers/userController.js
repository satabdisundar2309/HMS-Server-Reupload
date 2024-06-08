const userModel = require("../models/userModel");
require("dotenv").config();
const cloudinary = require('cloudinary').v2

// patient register
const patientRegister = async (req, res, next) => {
  try {
    const {
      firstname,
      lastname,
      email,
      phone,
      password,
      confirmPassword,
      gender,
      age,
      adhaar,
    } = req.body;
    if (
      !firstname ||
      !lastname ||
      !phone ||
      !email ||
      !password ||
      !confirmPassword ||
      !gender ||
      !age ||
      !adhaar
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill the form properly",
      });
    }
    if (password !== confirmPassword) {
      const err = {
        status: 400,
        message: "Password and confirm password did not match",
      };
      return next(err);
    }
    const exsistingUser = await userModel.findOne({ email: email });
    if (exsistingUser) {
      const err = {
        status: 400,
        message: "User already registered",
      };
      return next(err);
    }
    const newUser = await userModel.create({
      firstname,
      lastname,
      email,
      phone,
      password,
      gender,
      age,
      adhaar,
      role: "Patient",
    });

    const token = newUser.generateJsonWebToken();
    res
      .status(200)
      .json({
        success: true,
        message: "User registered successfully",
        newUser,
        token,
      });
  } catch (error) {
    console.log(error);
    const err = {
      status: 500,
      message: "Patient could not be register",
    };
    next(err);
  }
};

// user login
const login = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Please provide all details",
      });
    }

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      const err = {
        status: 400,
        message: "User not found",
      };
      return next(err);
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      const err = {
        status: 400,
        message: "Invalid email or password",
      };
      return next(err);
    }

    if (role !== user.role) {
      const err = {
        status: 400,
        message: "User with this role is not found",
      };
      return next(err);
    }

    const token = user.generateJsonWebToken();

    res
      .status(200)
      .json({
        success: true,
        message: "User logged in successfully",
        user,
        token,
      });
  } catch (error) {
    console.log(error);
    const err = {
      status: 500,
      message: "User login failed",
    };
    next(err);
  }
};

// register new admin
const adminRegister = async (req, res, next) => {
  try {
    const {
      firstname,
      lastname,
      email,
      phone,
      password,
      confirmPassword,
      gender,
      age,
      adhaar,
    } = req.body;
    if (
      !firstname ||
      !lastname ||
      !phone ||
      !email ||
      !password ||
      !confirmPassword ||
      !gender ||
      !age ||
      !adhaar
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill the form properly",
      });
    }
    if (password !== confirmPassword) {
      const err = {
        status: 400,
        message: "Password and confirm password did not match",
      };
      return next(err);
    }

    const exsistingUser = await userModel.findOne({ email: email });
    if (exsistingUser) {
      const err = {
        status: 400,
        message: "User already exists",
      };
      return next(err);
    }

    const newUser = await userModel.create({
      firstname,
      lastname,
      email,
      phone,
      password,
      gender,
      age,
      adhaar,
      role: "Admin",
    });

    res.status(200).json({
      success: true,
      message: "Admin registered successfully",
    });
  } catch (error) {
    console.log(error);
    const err = {
      status: 500,
      message: "Admin registration failed",
    };
    next(err);
  }
};

// get all doctors
const getAllDoctors = async (req, res, next) => {
  try {
    const doctors = await userModel.find({ role: "Doctor" });

    return res.status(200).json({
      success: true,
      message: "Doctors fetched successfully",
      doctors: doctors,
    });
  } catch (error) {
    console.log(error);
    const err = {
      status: 500,
      message: "Could not fetch doctors",
    };
    next(err);
  }
};

// get user details
const getSingleUserDetails = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      const err = {
        status: 400,
        message: "Could not fetch user details",
      };
      return next(err);
    }
    res.status(200).json({
      success: true,
      message: "User details fetched successfully",
      user: user,
    });
  } catch (error) {
    console.log(error);
    const err = {
      status: 500,
      message: "Could not fetch user details",
    };
    next(err);
  }
};

// logout admin
const logoutAdmin = async (req, res, next) => {
  try {
    res
      .status(200)
      .json({
        success: true,
        message: "Logged out successfully",
      });
  } catch (error) {
    console.log(error);
    const err = {
      status: 500,
      message: "Error while logging out",
    };
    next(err);
  }
};

// logout patient
const logoutPatient = async (req, res, next) => {
  try {
    res
      .status(200)
      .json({
        success: true,
        message: "Logged out successfully",
      });
  } catch (error) {
    console.log(error);
    const err = {
      status: 500,
      message: "Error while logging out",
    };
    next(err);
  }
};

const addNewDoctor = async (req, res, next) => {
  try {
    // if (!req.files || Object.keys(req.files).length === 0) {
    //   const err = {
    //     status: 400,
    //     message: "Doctor's Photo is required",
    //   };
    //   return next(err);
    // }

    // const { docAvatar } = req.files;
    // const allowedFormats = [
    //   "image/png",
    //   "image/jpeg",
    //   "image/jpg",
    //   "image/webp",
    // ];
    // if (!allowedFormats.includes(docAvatar.mimetype)) {
    //   const err = {
    //     status: 400,
    //     message: "File format not supported",
    //   };
    //   return next(err);
    // }

    const {
      firstname,
      lastname,
      email,
      phone,
      password,
      confirmPassword,
      gender,
      age,
      adhaar,
      doctorDepartment,
      docAvatar
    } = req.body;
    if (
      !firstname ||
      !lastname ||
      !phone ||
      !email ||
      !password ||
      !confirmPassword ||
      !gender ||
      !age ||
      !adhaar ||
      !doctorDepartment
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill the form properly",
      });
    }

    if(!docAvatar){
      return res.status(400).json({
        success: false,
        message: "Doctor's Photo is required",
      });
    }

    if (password !== confirmPassword) {
      const err = {
        status: 400,
        message: "Password and confirm password did not match",
      };
      return next(err);
    }

    const exsistingDoctor = await userModel.findOne({ email: email });
    if (exsistingDoctor) {
      const err = {
        status: 400,
        message: "Doctor already registered",
      };
      return next(err);
    }

    // const cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath)
    // if (!cloudinaryResponse || cloudinaryResponse.error) {
    //   console.log("Cloudinary Error: ", cloudinaryResponse.error || "Unknown cloudinary error")
    //   const err = {
    //     status: 500,
    //     message: "Failed to upload doctor's image",
    //   };
    //   return next(err);
    // }

    const newDoctor = await userModel.create({
      firstname,
      lastname,
      email,
      phone,
      password,
      gender,
      age,
      adhaar,
      doctorDepartment,
      docAvatar,
      role: "Doctor",
    });

    res
      .status(200)
      .json({
        success: true,
        message: "Doctor registered successfully",
        doctor: newDoctor
      });

  } catch (error) {
    console.log(error);
    const err = {
      status: 500,
      message: "Error while adding new doctor",
    };
    next(err);
  }
};

module.exports = {
  patientRegister,
  login,
  adminRegister,
  getAllDoctors,
  getSingleUserDetails,
  logoutAdmin,
  logoutPatient,
  addNewDoctor
};
