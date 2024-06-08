const {z} = require('zod')

const messageSchema = z.object({
    firstname: z.string({required_error: "Firstname is required"})
    .trim()
    .min(3, {message: "Firstname must be atleast 3 characters"}),

    lastname: z.string({required_error: "Lastname is required"})
    .trim()
    .min(3, {message: "Lastname must be atleast 3 characters"}),

    email: z.string({required_error: "Email is required"})
    .trim()
    .email({message: "Invalid email address"})
    .min(3, {message: "Email must be atleast 3 characters"}),

    phone: z.string({ required_error: "Phone number is required" })
    .trim()
    .min(10, { message: "Phone must be at least of 10 characters" })
    .max(13, { message: "Phone must not be more than 13 characters" }),

    message: z.string({ required_error: "You must add a message" })
    .min(5, { message: "Message must be at least of 5 characters" })
})

module.exports = messageSchema;