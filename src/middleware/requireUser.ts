import { Request, Response, NextFunction } from "express";
export function requireUser(_req: Request, res: Response, next: NextFunction) {
    const user = res.locals.user;
    if (!user) {
        return res.sendStatus(403); // Forbidden
    }
    return next();
}
