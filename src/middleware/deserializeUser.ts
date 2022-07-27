import { Request, Response, NextFunction } from "express";
import { get } from "lodash";
import { verifyJwt } from "../utils/jwt";
export function deserializeUser(req: Request, res: Response, next: NextFunction) {
    const accessToken = get(req, "headers.authorization", "").replace("Bearer ", "");
    if (!accessToken) {
        return next();
    }

    const { payload } = verifyJwt(accessToken);
    if (payload) {
        res.locals.user = payload;
        return next();
    }

    return next();
}
