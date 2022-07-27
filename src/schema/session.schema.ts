import { z } from "zod";

/**
 * @swagger
 * components:
 *  schemas:
 *      CreateSessionInput:
 *          type: object
 *          required:
 *              - email
 *              - password
 *          properties:
 *              email:
 *                  type: string
 *                  example: jane_doe@example.com
 *              password:
 *                  type: string
 *      Session:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *              createdAt:
 *                  type: string
 *                  format: date-time
 *              updatedAt:
 *                  type: string
 *                  format: date-time
 *              userId:
 *                  type: string
 *              valid:
 *                  type: boolean
 *              userAgent:
 *                  type: string
 */
export const createSessionSchema = z.object({
    body: z.object({
        email: z.string({ required_error: "Email is required" }).email("Invalid email"),
        password: z.string({ required_error: "Password is required" }),
    }),
});

export type CreateSessionInput = z.TypeOf<typeof createSessionSchema>;
