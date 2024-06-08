const { z } = require("zod");

const userSchema = z.object({
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
    .string({ required_error: "Age is required" }),


  gender: z.enum(["Male", "Female", "Others"], {
    message: "Choose your gender among Male, Female, or Others",
  }),

  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(6, { message: "Password must be atleast 6 characters" }),

  confirmPassword: z
    .string({ required_error: "Confirm password is required" })
    .trim()
    .min(6, { message: "Confirm password must be atleast 6 characters" }),

  role: z.enum(["Admin", "Patient", "Doctor"], {
    message: "Choose your role among Admin, Patient, or Doctor",
  }).optional(),

  doctorDepartment: z.string().optional(),

  docAvatar: z
    .string()
    .optional(),
});

module.exports = userSchema;

// in zod validation, it is mandatory
