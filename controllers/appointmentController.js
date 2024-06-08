const appointmentModel = require("../models/appointmentModel");
const userModel = require("../models/userModel");

const appointment = async (req, res, next) => {
  try {
    const {
      firstname,
      lastname,
      email,
      phone,
      gender,
      age,
      adhaar,
      appointmentDate,
      department,
      doctorFirstname,
      doctorLastname,
      hasVisited,
      address,
    } = req.body;

    if (
      !firstname ||
      !lastname ||
      !email ||
      !phone ||
      !gender ||
      !age ||
      !adhaar ||
      !appointmentDate ||
      !department ||
      !doctorFirstname ||
      !doctorLastname ||
      !address
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill the form properly",
      });
    }

    const isConflict = await userModel.find({
      firstname: doctorFirstname,
      lastname: doctorLastname,
      role: "Doctor",
      doctorDepartment: department,
    });
    if (isConflict.length === 0) {
      const err = {
        status: 404,
        message: "Doctor not found",
      };
      return next(err);
    }
    if (isConflict.length > 1) {
      const err = {
        status: 404,
        message: "Doctors conflict, please contact via phone",
      };
      return next(err);
    }

    const doctorId = isConflict[0]._id;
    const patientId = req.user._id;
    const appointment = await appointmentModel.create({
      firstname,
      lastname,
      email,
      phone,
      gender,
      age,
      adhaar,
      appointmentDate,
      department,
      doctor: {
        firstname: doctorFirstname,
        lastname: doctorLastname,
      },
      hasVisited,
      address,
      doctorId: doctorId,
      patientId: patientId,
    });

    res.status(200).json({
      success: true,
      message: "Appointment booked successfully",
      appointment
    });
  } catch (error) {
    console.log(error);
    const err = {
      status: 500,
      message: "Could not book appointment",
    };
    next(err);
  }
};

const getAllAppointments = async (req, res, next)=>{
  try {

    const appointments = await appointmentModel.find({});
    res.status(200).json({
      success: true,
      message: "Appointments fetched successfully",
      appointments
    })
    
  } catch (error) {
    console.log(error);
    const err = {
      status: 500,
      message: "Error While fetching appointments",
    };
    next(err);
  }
}

const updateAppointmentStatus = async (req, res, next)=>{
  try {
    
    const {id} = req.params
    const status = req.body.status
    let appointment = await appointmentModel.findById({_id:id})
    if(!appointment){
      const err = {
        status: 404,
        message: "No appointment found",
      };
      return next(err);
    }

    appointment = await appointmentModel.findByIdAndUpdate({_id: id},
    {
      $set: {
        status: status
      }
    }, {
      new: true
    })

    res.status(200).json({
      success: true,
      message: "status updated successfully",
      appointment
    })

  } catch (error) {
    const err = {
      status: 500,
      message: "Error While updating appointments status",
    };
    next(err);
  }
}

const deleteAppointment = async (req, res, next)=>{
  try {

    const {id} = req.params;
    let appointment = await appointmentModel.findById({_id: id})
    if(!appointment){
      const err = {
        status: 404,
        message: "No appointment found",
      };
      return next(err);
    }

    appointment = await appointmentModel.findByIdAndDelete({_id: id})
    res.status(200).json({
      success: true,
      message: "Appointment Deleted successfully"
    })
    
  } catch (error) {
    const err = {
      status: 500,
      message: "Error While deleting appointment",
    };
    next(err);
  }
}

module.exports = { appointment, getAllAppointments, updateAppointmentStatus, deleteAppointment };
