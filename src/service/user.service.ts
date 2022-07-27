import argon2 from "argon2";
import { omit } from "lodash";
import { CreateUserInput } from "../schema/user.schema";
import { prisma } from "../utils/prisma";

export async function createUser(input: CreateUserInput["body"]) {
    const { email, password } = input;
    const hashedPassword = await argon2.hash(password);
    try {
        const user = await prisma.user.create({
            data: {
                email: email.toLowerCase(),
                password: hashedPassword,
            },
        });
        return omit(user, "password");
    } catch (error) {
        throw new Error(error);
    }
}

export async function validatePassword({ email, password }: { email: string; password: string }) {
    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (!user) {
        return false;
    }

    const isValid = await argon2.verify(user.password, password);
    if (!isValid) return false;
    return omit(user, "password");
}
