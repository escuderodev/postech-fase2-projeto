import { Request, Response } from "express"
import { CreateUserService } from "../../service/User/CreateUserService"

export const createUser = async (req: Request, res: Response) => {

    const createUserService = new CreateUserService()
    const user = await createUserService.execute(req, res)
    
    res.status(201).json({
        message: "create user is success!"
    })
}