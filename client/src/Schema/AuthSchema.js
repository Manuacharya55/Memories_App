import { z } from "zod";

export const registerSchema = z.object({
  fullname: z.string().nonempty("Name is required"),
  email: z.email().nonempty("please enter email"),
  password: z.string().nonempty("please enter password").min(6).max(14),
});

export const loginSchema = z.object({
  email: z.email().nonempty("please enter email"),
  password: z.string().nonempty("please enter password").min(6).max(14),
});
