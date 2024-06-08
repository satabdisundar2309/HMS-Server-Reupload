const { z } = require("zod");

const appointmentSchema = z.object({
  firstname: z
    .string({ required_error: "Firstname is required" })
    .trim()
    .min(3, { message: "Firstname must be atleast 3 characters" }),

  lastname: z
    .string({ required_error: "Lastname is required" })
    .trim()
    .min(3, { message: "Lastname must be atleast 3 characters" }),

  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be atleast 3 characters" }),

  phone: z
    .string({ required_error: "Phone number is required" })
    .trim()
    .min(10, { message: "Phone must be at least of 10 characters" })
    .max(13, { message: "Phone must not be more than 13 characters" }),

  adhaar: z
    .string({ required_error: "Adhaar number is required" })
    .trim()
    .min(12, { message: "Adhaar must be of 12 characters" })
    .max(12, { message: "Adhaar must be of 12 characters" }),

    age: z
    .string({ required_error: "Patient's age is required" }),

  gender: z.enum(["Male", "Female", "Others"], {
    message: "Choose your gender among Male, Female, or Others",
  }),

  appointmentDate: z
    .string({ required_error: "Appointment Date is required" })
    .trim(),

  department: z.string({ required_error: "Department is required" }).trim(),

  doctorFirstname: z
    .string({ required_error: "Doctor's Firstname is required" })
    .trim()
    .min(2, { message: "Doctor's Firstname must be atleast 3 characters" }),

    doctorLastname: z
    .string({ required_error: "Doctor's lastname is required" })
    .trim()
    .min(2, { message: "Doctor's lastname must be atleast 3 characters" }),

  hasVisited: z.boolean().optional(),

  address: z
    .string({ required_error: "Address is required" })
    .trim()
    .min(10, { message: "Address must be of 10 characters" }),

  status: z.enum(["Pending", "Accepted", "Rejected"]).optional(),
});

module.exports = appointmentSchema;
