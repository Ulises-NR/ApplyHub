import { z } from "zod";

export const registerSchema = z.object({
  email: z
    .string({
      invalid_type_error: "The email must be a valid character string",
      required_error: "Email is a required field",
    })
    .email({
      message: "The email is not valid",
    }),
  password: z
    .string({
      invalid_type_error: "Password must be a string of characters",
      required_error: "Password is a required field",
    })
    .min(8, {
      message: "Password must contain at least 8 characters",
    })
    .max(30, {
      message: "Password cannot exceed 30 characters",
    }),
});

export const loginSchema = z.object({
  email: z
    .string({
      invalid_type_error: "The email must be a valid character string",
      required_error: "Email is a required field",
    })
    .email({
      message: "The email is not valid",
    }),
  password: z
    .string({
      invalid_type_error: "Password must be a string of characters",
      required_error: "Password is a required field",
    })
    .min(8, {
      message: "Password must contain at least 8 characters",
    })
    .max(30, {
      message: "Password cannot exceed 30 characters",
    }),
});
