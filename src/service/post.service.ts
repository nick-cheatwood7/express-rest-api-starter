import { prisma } from "../utils/prisma";
import { Prisma } from "@prisma/client";

export async function createPost(query: Prisma.PostCreateArgs) {
    return await prisma.post.create(query);
}
export async function updatePost(query: Prisma.PostUpdateArgs) {
    return await prisma.post.update(query);
}
export async function findPost(query: Prisma.PostFindFirstArgs) {
    return await prisma.post.findFirst(query);
}
export async function deletePost(query: Prisma.PostDeleteArgs) {
    return await prisma.post.delete(query);
}
