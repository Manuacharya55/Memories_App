import { z } from "zod";

export const ProfileSchema = z.object({
    fullname: z.string().min(3, "Full name must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    image: z.union([z.string().url("Invalid image URL"), z.any()]).optional(),
});

export const PasswordSchema = z.object({
    currentpassword: z.string().min(6, "Password must be at least 6 characters long"),
    newpassword: z.string().min(6, "Password must be at least 6 characters long"),
    confirmpassword: z.string().min(6, "Password must be at least 6 characters long"),
}).refine((data) => data.newpassword === data.confirmpassword, {
    message: "Passwords don't match",
    path: ["confirmpassword"],
});
