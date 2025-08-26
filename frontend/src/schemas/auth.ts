import { z } from "zod";

 const registerSchema = z.object({
    firstName: z.string().min(1, {message: "First name is required"}),
    lastName: z.string().min(1, {message: "Last name is required"}),
    email: z.string().email({message: "Invalid email address"}),
    phone: z.string().min(1, {message: "Phone number is required"}),
    country: z.string().min(1, {message: "Country is required"}),
    password: z.string().min(8, {message: "Password must be at least 8 characters long"}),
})

const loginSchema = z.object({
    email: z.string().email({message: "Invalid email address"}),
    password: z.string().min(8, {message: "Password must be at least 8 characters long"}),
})

const verifySchema = z.object({
    otp: z.string().min(6, {message: "OTP must be 6 digits"}),
})

const forgotPasswordSchema = z.object({
    email: z.string().email({message: "Invalid email address"}),
})

const newPasswordSchema = z.object({
    password: z.string().min(8, {message: "Password must be at least 8 characters long"}),
    confirmPassword: z.string().min(8, {message: "Password must be at least 8 characters long"}),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})

type RegisterSchema = z.infer<typeof registerSchema>
type LoginSchema = z.infer<typeof loginSchema>
type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>
type NewPasswordSchema = z.infer<typeof newPasswordSchema>;
type VerifySchema = z.infer<typeof verifySchema>;

export {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  newPasswordSchema,
  verifySchema,
  type RegisterSchema,
  type LoginSchema,
  type ForgotPasswordSchema,
  type NewPasswordSchema,
  type VerifySchema,
};
