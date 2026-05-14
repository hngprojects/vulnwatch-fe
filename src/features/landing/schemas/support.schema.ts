import { z } from "zod";

export const supportSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  requestType: z.string().min(1, "Please select a service"),
  message: z.string().min(1, "Message is required"),
});

export type SupportFormData = z.infer<typeof supportSchema>;
