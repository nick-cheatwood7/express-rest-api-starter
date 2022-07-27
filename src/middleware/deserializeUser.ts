import { Request, Response, NextFunction } from "express";
import { get } from "lodash";
import { reIssueAccessToken } from "../service/session.service";
import { verifyJwt } from "../utils/jwt";
export async function deserializeUser(req: Request, res: Response, next: NextFunction) {
    // Parse out both tokens
    const accessToken = get(req, "headers.authorization", "").replace("Bearer ", "");
    const refreshToken = get(req, "headers.x-refresh-token");

    if (!accessToken) {
        return next();
    }

    const { payload, expired } = verifyJwt(accessToken);
    if (payload) {
        res.locals.user = payload;
        return next();
    }

    if (expired && refreshToken) {
        const newAccessToken = await reIssueAccessToken({ refreshToken });
        if (newAccessToken) {
            res.setHeader("x-access-token", newAccessToken);
        }

        const result = verifyJwt(newAccessToken as string);
        res.locals.user = result.payload;
        return next();
    }

    return next();
}
