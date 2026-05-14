import { z } from "zod";
import {
  signUpSchema,
  loginSchema,
  forgotPasswordSchema,
} from "@/features/auth/schemas/auth.schema";

export type SignUpFormData = z.infer<typeof signUpSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
