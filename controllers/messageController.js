const messageModel = require("../models/messageModel");


//? sending a message
const sendMessage = async (req, res, next) => {
  try {
    const { firstname, lastname, email, phone, message } = req.body;
    if (!firstname || !lastname || !phone || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill the form properly",
      });
    }

    const newMessage = await messageModel.create({
      firstname,
      lastname,
      email,
      phone,
      message,
    });

    return res.status(200).json({
        success: true,
        message: "Message sent successfully",
    })

  } catch (error) {
    console.log(error)
    const err = {
        status: 500,
        message: "Message could not be sent"
    }
    next(err);
  }
};

const getAllMessages = async (req, res, next)=>{
  try {

    const messages = await messageModel.find({})
    res.status(200).json({
      success: true,
      message: "Messages fetched successfully",
      messages: messages
    })
    
  } catch (error) {
    console.log(error)
    const err = {
        status: 500,
        message: "Error while fetching all messages"
    }
    next(err);
  }
}

module.exports = {sendMessage, getAllMessages}
