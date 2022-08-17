import { object, string, TypeOf } from "zod";

const payload = {
    body: object({
        title: string({
            required_error: "Title is required",
        }),
        content: string({ required_error: "Content is required" }),
    }),
};

const params = {
    params: object({
        postId: string({
            required_error: "postId is required",
        }),
    }),
};

/**
 * @swagger
 * components:
 *  schemas:
 *      CreatePostInput:
 *          type: object
 *          required:
 *              - title
 *              - content
 *          properties:
 *              title:
 *                  type: string
 *                  example: "My First Post"
 *              content:
 *                  type: string
 *                  example: "Hello World!"
 *      Post:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *              createdAt:
 *                  type: string
 *                  format: date-time
 *              updatedAt:
 *                  type: string
 *                  format: date-time
 *              userId:
 *                  type: string
 *              title:
 *                  type: string
 *              content:
 *                  type: string
 */
export const createPostSchema = object({
    ...payload,
});

export const getPostSchema = object({
    ...params,
});

/**
 * @swagger
 * components:
 *  schemas:
 *      UpdatePostInput:
 *          type: object
 *          required:
 *              - title
 *              - content
 *          properties:
 *              title:
 *                  type: string
 *                  example: "My Updated Post"
 *              content:
 *                  type: string
 *                  example: "My post content!"
 */
export const updatePostSchema = object({
    ...payload,
    ...params,
});

export const deletePostSchema = object({
    ...params,
});

export type CreatePostInput = TypeOf<typeof createPostSchema>;
export type GetPostInput = TypeOf<typeof getPostSchema>;
export type UpdatePostInput = TypeOf<typeof updatePostSchema>;
export type DeletePostInput = TypeOf<typeof deletePostSchema>;
