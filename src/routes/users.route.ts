import { Router } from "express";
import { createUserHandler } from "../controllers/user.controller";
import { validateResource } from "../middleware/validateResource";
import { createUserSchema } from "../schema/user.schema";

const router = Router();

/**
 * @swagger
 * /api/users:
 *  post:
 *    tags:
 *    - Users
 *    summary: Create a User
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *             schema:
 *              $ref: '#/components/schemas/CreateUserInput'
 *    responses:
 *      201:
 *          description: Created
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      400:
 *          description: Bad Request
 *      409:
 *          description: Conflict
 */
router.post("/", validateResource(createUserSchema), createUserHandler);

export default router;
