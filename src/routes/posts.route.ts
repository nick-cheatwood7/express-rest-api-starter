import { Router } from "express";
import {
    createPostHandler,
    deletePostHandler,
    getPostHandler,
    updatePostHandler,
} from "../controllers/post.controller";
import { requireUser } from "../middleware/requireUser";
import { validateResource } from "../middleware/validateResource";
import { createPostSchema, deletePostSchema, getPostSchema, updatePostSchema } from "../schema/post.schema";

const router = Router();

router.post("/", [requireUser, validateResource(createPostSchema)], createPostHandler);
router.put("/:postId", [requireUser, validateResource(updatePostSchema)], updatePostHandler);
router.get("/:postId", [requireUser, validateResource(getPostSchema)], getPostHandler);
router.delete("/:postId", [requireUser, validateResource(deletePostSchema)], deletePostHandler);

export default router;
