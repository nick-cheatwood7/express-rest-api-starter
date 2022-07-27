import { z } from "zod";

export const createUserSchema = z.object({
    body: z
        .object({
            email: z.string({ required_error: "Email is required" }).email("Invalid email"),
            password: z
                .string({
                    required_error: "Password is required",
                })
                .min(6, "Password must be 6 characters or more"),
            confirmPassword: z.string({
                required_error: "confirmPassword is required",
            }),
        })
        .refine((data) => data.password === data.confirmPassword, {
            message: "Passwords do not match",
            path: ["confirmPassword"],
        }),
});

export type CreateUserInput = Omit<z.TypeOf<typeof createUserSchema>, "body.confirmPassword">;
