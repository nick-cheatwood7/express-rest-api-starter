import { Router } from "express";

// Routes
import userRouter from "./users.route";
import sessionRouter from "./sessions.route";
import healthCheckRouter from "./healthcheck.route";
import postRouter from "./posts.route";

const router = Router();

router.use("/healthcheck", healthCheckRouter);
router.use("/users", userRouter);
router.use("/sessions", sessionRouter);
router.use("/posts", postRouter);
export default router;
