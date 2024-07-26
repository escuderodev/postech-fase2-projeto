import { Request, Response } from "express"
import { GetAllUsersService } from "../../service/User/GetAllUsersService"

export const getAllUsers = async (req: Request, res: Response) => {

    const getAllUsersService = new GetAllUsersService()
    const userList = await getAllUsersService.execute(req)
    res.status(200).json({userList})
}