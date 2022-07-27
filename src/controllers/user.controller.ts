import { Request, Response } from "express";
import { CreateUserInput } from "../schema/user.schema";
import { createUser } from "../service/user.service";
import { omit } from "lodash";

// eslint-disable-next-line @typescript-eslint/ban-types
export async function createUserHandler(req: Request<{}, {}, CreateUserInput["body"]>, res: Response) {
    try {
        const user = await createUser(req.body);
        return res.status(201).json(omit(user, "password"));
    } catch (error) {
        console.error(error);
        return res.status(409).send(error.message);
    }
}
