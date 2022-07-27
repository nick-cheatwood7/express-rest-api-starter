import { Router, Request, Response } from "express";

const router = Router();

/**
 * @swagger
 * /api/healthcheck:
 *  get:
 *    tags:
 *    - Healthcheck
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/HealthcheckResponse'
 */
router.get("/", (_req: Request, res: Response) => {
    res.status(200).json({ ok: true, message: "All systems operational" });
});

export default router;
