import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
    res.status(200).json({ ok: true, message: "All systems operational" });
});

export default router;
