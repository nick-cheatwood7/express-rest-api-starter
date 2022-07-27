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

/**
 * @swagger
 * /api/posts:
 *  post:
 *    tags:
 *    - Posts
 *    summary: Create a Post
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *             schema:
 *              $ref: '#/components/schemas/CreatePostInput'
 *    responses:
 *      201:
 *          description: Created
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Post'
 *      400:
 *          description: Bad Request
 *      403:
 *          description: Forbidden
 */
router.post("/", [requireUser, validateResource(createPostSchema)], createPostHandler);

/**
 * @swagger
 * /api/posts/{postId}:
 *  put:
 *    tags:
 *    - Posts
 *    summary: Update a Post
 *    parameters:
 *    - name: postId
 *      in: path
 *      description: The id of the Post
 *      required: true
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *             schema:
 *              $ref: '#/components/schemas/UpdatePostInput'
 *    responses:
 *      201:
 *        description: Updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Post'
 *      400:
 *          description: Bad request
 *      403:
 *          description: Forbidden
 */
router.put("/:postId", [requireUser, validateResource(updatePostSchema)], updatePostHandler);

/**
 * @swagger
 * /api/posts/{postId}:
 *  get:
 *    tags:
 *    - Posts
 *    summary: Get a Post
 *    parameters:
 *    - name: postId
 *      in: path
 *      description: The id of the Post
 *      required: true
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Post'
 *      400:
 *          description: Bad Request
 *      404:
 *          description: Not found
 *      403:
 *          description: Forbidden
 */
router.get("/:postId", [requireUser, validateResource(getPostSchema)], getPostHandler);

/**
 * @swagger
 * /api/posts/{postId}:
 *  delete:
 *    tags:
 *    - Posts
 *    summary: Delete a Post
 *    parameters:
 *    - name: postId
 *      in: path
 *      description: The id of the Post
 *      required: true
 *    responses:
 *      200:
 *        description: OK
 *      400:
 *          description: Bad Request
 *      404:
 *          description: Not found
 *      403:
 *          description: Forbidden
 */
router.delete("/:postId", [requireUser, validateResource(deletePostSchema)], deletePostHandler);

export default router;
