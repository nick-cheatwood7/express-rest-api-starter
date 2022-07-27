import argon2 from "argon2";
import { CreateUserInput } from "../schema/user.schema";
import { prisma } from "../utils/prisma";

export async function createUser(input: CreateUserInput["body"]) {
    const { email, password } = input;
    const hashedPassword = await argon2.hash(password);
    try {
        return await prisma.user.create({
            data: {
                email: email.toLowerCase(),
                password: hashedPassword,
            },
        });
    } catch (error) {
        throw new Error(error);
    }
}
