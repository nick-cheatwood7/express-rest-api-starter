/* eslint-disable @typescript-eslint/ban-types */
import { Request, Response } from "express";
import { CreatePostInput, DeletePostInput, GetPostInput, UpdatePostInput } from "../schema/post.schema";
import { createPost, deletePost, findPost, updatePost } from "../service/post.service";

export async function createPostHandler(req: Request<{}, {}, CreatePostInput["body"]>, res: Response) {
    const userId = res.locals.user.userId;
    const body = req.body;
    const post = await createPost({
        data: {
            ...body,
            userId,
        },
    });
    return res.status(201).send(post);
}
export async function updatePostHandler(req: Request<UpdatePostInput["params"]>, res: Response) {
    const userId = res.locals.user.userId;
    const postId = req.params.postId;
    const update = req.body;
    try {
        const updatedPost = await updatePost({
            where: {
                id: postId,
            },
            data: {
                ...update,
                userId,
            },
        });
        return res.status(201).send(updatedPost);
    } catch (error) {
        return res.sendStatus(400);
    }
}
export async function getPostHandler(req: Request<GetPostInput["params"]>, res: Response) {
    const postId = req.params.postId;

    const post = await findPost({
        where: {
            id: postId,
        },
    });

    if (!post) {
        return res.sendStatus(404);
    }

    return res.status(200).send(post);
}
export async function deletePostHandler(req: Request<DeletePostInput["params"]>, res: Response) {
    const userId = res.locals.user.userId;
    const postId = req.params.postId;

    const post = await findPost({
        where: {
            id: postId,
        },
    });

    if (!post) {
        return res.sendStatus(404);
    }

    if (post.userId !== userId) {
        return res.sendStatus(403);
    }

    await deletePost({
        where: {
            id: postId,
        },
    });

    return res.sendStatus(200);
}
