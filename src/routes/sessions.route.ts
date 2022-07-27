import { Router } from "express";
import {
    createUserSessionHandler,
    deleteSessionHandler,
    getUserSessionHandler,
} from "../controllers/session.controller";
import { requireUser } from "../middleware/requireUser";
import { validateResource } from "../middleware/validateResource";
import { createSessionSchema } from "../schema/session.schema";

const router = Router();

/**
 * @swagger
 * /api/sessions:
 *  post:
 *    tags:
 *    - Sessions
 *    summary: Create a Session (log in)
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *             schema:
 *              $ref: '#/components/schemas/CreateSessionInput'
 *    responses:
 *      201:
 *          description: Created
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          accessToken:
 *                              type: string
 *                          refreshToken:
 *                              type: string
 *      401:
 *          description: Invalid credentials
 *      400:
 *          description: Bad Request
 */
router.post("/", validateResource(createSessionSchema), createUserSessionHandler);

/**
 * @swagger
 * /api/sessions:
 *  get:
 *    tags:
 *    - Sessions
 *    summary: Get all Sessions for the current User
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/Session'
 *      400:
 *          description: Bad request
 *      403:
 *          description: Forbidden
 */
router.get("/", requireUser, getUserSessionHandler);

/**
 * @swagger
 * /api/sessions/{sessionId}:
 *  delete:
 *    tags:
 *    - Sessions
 *    summary: Delete a Session (logout)
 *    parameters:
 *    - name: sessionId
 *      in: path
 *      description: The id of the Session
 *      required: true
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *               schema:
 *                  type: object
 *                  properties:
 *                      accessToken:
 *                          type: string
 *                          nullable: true
 *                          default: null
 *                      refreshToken:
 *                          type: string
 *                          nullable: true
 *                          default: null
 *      400:
 *          description: Bad Request
 *      403:
 *          description: Forbidden
 */
router.delete("/", requireUser, deleteSessionHandler);

export default router;
