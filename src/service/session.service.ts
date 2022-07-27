import { prisma } from "../utils/prisma";
import { Prisma } from "@prisma/client";
import { verifyJwt } from "../utils/jwt";
import { get } from "lodash";
import { findUser } from "./user.service";
import { createAccessToken } from "../utils/auth";

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

export async function reIssueAccessToken({ refreshToken }: { refreshToken: string }) {
    const { payload } = verifyJwt(refreshToken);

    if (!payload || !get(payload, "sessionId")) {
        return false;
    }

    const session = await prisma.session.findUnique({
        where: {
            id: get(payload, "sessionId"),
        },
    });

    if (!session || !session.valid) {
        return false;
    }

    const user = await findUser({ where: { id: session.userId } });
    if (!user) {
        return false;
    }

    // Create new access token
    const accessToken = createAccessToken({
        userId: user.id,
        sessionId: session.id,
    });
    return accessToken;
}
