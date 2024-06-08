const express = require('express');
const router = express.Router();

// importing schemas for validation
const messageSchema = require('../schemaValidators/messageSchemaValidator')
const userSchema = require('../schemaValidators/userSchemaValidation')
const appointmentSchema = require('../schemaValidators/appointMentSchemaValidation')

const { sendMessage, getAllMessages } = require('../controllers/messageController');
const { patientRegister, login, adminRegister, getAllDoctors, getSingleUserDetails, logoutAdmin, logoutPatient, addNewDoctor } = require('../controllers/userController');
const {appointment, getAllAppointments, updateAppointmentStatus, deleteAppointment} = require('../controllers/appointmentController')

// importing schema validator middleware
const validate = require('../middlewares/schemaValidationMiddleware');

// importing authentication and authorization middleware
const { isAdminAuthenticated, isPatientAuthenticated } = require('../middlewares/auth');


router.post('/sendMessage',validate(messageSchema), sendMessage);
router.post('/registerPatient',validate(userSchema), patientRegister);
router.post('/registerAdmin',validate(userSchema),isAdminAuthenticated, adminRegister);
router.post('/registerDoctor',validate(userSchema),isAdminAuthenticated, addNewDoctor);
router.post('/loginUser', login);
router.post('/bookAppointment', validate(appointmentSchema), isPatientAuthenticated, appointment)
router.get('/doctors', getAllDoctors);
router.get('/patient/userDetails/me', isPatientAuthenticated, getSingleUserDetails);
router.get('/admin/userDetails/me', isAdminAuthenticated, getSingleUserDetails);
router.get('/admin/logout', isAdminAuthenticated, logoutAdmin);
router.get('/patient/logout', isPatientAuthenticated, logoutPatient);
router.get('/getMessages',isAdminAuthenticated, getAllMessages);
router.get('/getAppointments',isAdminAuthenticated, getAllAppointments);
router.put('/updateStatus/:id',isAdminAuthenticated, updateAppointmentStatus);
router.delete('/delete/:id',isAdminAuthenticated, deleteAppointment);

module.exports = router;