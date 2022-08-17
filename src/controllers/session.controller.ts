import { Request, Response } from "express";
import { createSession, findSessions, updateSession } from "../service/session.service";
import { validatePassword } from "../service/user.service";
import { createAccessToken, createRefreshToken } from "../utils/auth";

export async function createUserSessionHandler(req: Request, res: Response) {
    // Validate user's password
    const user = await validatePassword(req.body);
    if (!user) {
        return res.status(401).send("Invalid email or password");
    }
    // Create Session record
    const session = await createSession(user.id, req.get("user-agent") || "");
    // Create access token
    const accessToken = createAccessToken({
        userId: user.id,
        sessionId: session.id,
    });
    // Create refresh token
    const refreshToken = createRefreshToken({
        userId: user.id,
        sessionId: session.id,
    });

    // return access and refresh token
    return res.status(201).json({ accessToken, refreshToken });
}

export async function getUserSessionHandler(_req: Request, res: Response) {
    const userId = res.locals.user.userId;
    const sessions = await findSessions({
        where: {
            userId,
            valid: true,
        },
    });
    return res.send(sessions);
}

export async function deleteSessionHandler(_req: Request, res: Response) {
    const sessionId = res.locals.user.sessionId;
    await updateSession({
        where: {
            id: sessionId,
        },
        data: {
            valid: false,
        },
    });
    return res.json({
        accesstoken: null,
        refreshToken: null,
    });
}
