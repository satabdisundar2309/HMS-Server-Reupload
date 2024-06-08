const jwt = require('jsonwebtoken')
require('dotenv').config()
const userModel = require('../models/userModel')

// admin authentication and authorization
const isAdminAuthenticated = async (req, res, next) => {
  try {

    const token = req.header("Authorization");
    if(!token){
        const err = {
            status: 400,
            message: "Admin is not authenticated, please login again",
          };
          return next(err);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

    if(!decoded){
        const err = {
            status: 400,
            message: "Admin is not authenticated, please login again",
          };
          return next(err);
    }

    req.user = await userModel.findById({_id : decoded.id})
    if (req.user.role !== "Admin") {
        const err = {
            status: 400,
            message: `A ${req.user.role} is not authorized to this resource`,
          };
          return next(err);
    }
    next();

  } 
  catch (error) {
    console.log(error);
    const err = {
      status: 500,
      message: "Error in server side",
    };
    return next(err);
  }
};

// patient authentication and authorization
const isPatientAuthenticated = async (req, res, next) => {
    try {
  
      const token = req.header("Authorization");
      if(!token){
          const err = {
              status: 400,
              message: "User is not authenticated, please signup/login",
            };
            return next(err);
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
      
      if(!decoded){
          const err = {
              status: 400,
              message: "User is not authenticated, please signup/login",
            };
            return next(err);
      }
  
      req.user = await userModel.findById({_id : decoded.id})
      if (req.user.role !== "Patient") {
          const err = {
              status: 400,
              message: `A ${req.user.role} is not authorized to this resource`,
            };
            return next(err);
      }
      next();
  
    } 
    catch (error) {
      console.log(error);
      const err = {
        status: 500,
        message: "Please login/signup to proceed",
      };
      return next(err);
    }
  };

module.exports = {isAdminAuthenticated, isPatientAuthenticated}
