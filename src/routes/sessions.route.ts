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

router.post("/", validateResource(createSessionSchema), createUserSessionHandler);
router.get("/", requireUser, getUserSessionHandler);
router.delete("/", requireUser, deleteSessionHandler);

export default router;
