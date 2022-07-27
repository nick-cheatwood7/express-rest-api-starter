import { prisma } from "../utils/prisma";
import { Prisma } from "@prisma/client";

export async function createSession(userId: string, userAgent: string) {
    const session = await prisma.session.create({
        data: {
            userId,
            userAgent,
        },
    });
    return session;
}

export async function findSessions(query: Prisma.SessionFindManyArgs) {
    return await prisma.session.findMany(query);
}

export async function updateSession(query: Prisma.SessionUpdateArgs) {
    return await prisma.session.update(query);
}
