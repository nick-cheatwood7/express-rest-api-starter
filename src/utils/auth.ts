import { signJwt } from "./jwt";
export function createAccessToken({ userId, sessionId }: { userId: string; sessionId: string }) {
    const token = signJwt(
        {
            userId,
            sessionId,
        },
        {
            expiresIn: "15m",
        },
    );
    return token;
}

export function createRefreshToken({ userId, sessionId }: { userId: string; sessionId: string }) {
    const token = signJwt(
        {
            userId,
            sessionId,
        },
        {
            expiresIn: "1yr",
        },
    );
    return token;
}
