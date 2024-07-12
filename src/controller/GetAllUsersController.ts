import { Request, Response } from "express"
import { GetAllUsersService } from "../service/GetAllUsersService"

export const getAllUsers = async (req: Request, res: Response) => {

    const getAllUsersService = new GetAllUsersService()
    const userList = await getAllUsersService.execute(req)
    return res.status(200).json({userList})
}