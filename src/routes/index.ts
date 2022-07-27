import { Router } from "express";

// Routes
import userRouter from "./users.route";
import healthCheckRouter from "./healthcheck.route";

const router = Router();

router.use("/healthcheck", healthCheckRouter);
router.use("/users", userRouter);
export default router;
