import { Request, Response } from "express"
import { CreateUserService } from "../service/CreateUserService"

export const createUser = async (req: Request, res: Response) => {

    const createUserService = new CreateUserService()
    const user = await createUserService.execute(req, res)
    return res.status(201).json(user)
}