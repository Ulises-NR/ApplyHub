import { z } from "zod";

export const applicationSchema = z.object({
  position: z
    .string({
      required_error: "Position is required field",
      invalid_type_error: "Position is invalid type field",
    })
    .min(1, {
      message: "Position must be at least 1 characters",
    })
    .max(50, { message: "Position must be less than 50 characters" }),
  company: z
    .string({
      required_error: "Position is required field",
      invalid_type_error: "Position is invalid type field",
    })
    .min(1, {
      message: "Position must be at least 1 characters",
    })
    .max(100, { message: "Position must be less than 100 characters" }),
  date: z.date({
    required_error: "Date is required field",
    invalid_type_error: "Date is invalid type field",
  }),
  status: z.enum(
    ["dnd-applied", "dnd-interviewee", "dnd-offer", "dnd-denied"],
    {
      required_error: "Status is required field",
      message: "Invalid value",
      invalid_type_error: "Status is invalid type field",
    }
  ),
});
