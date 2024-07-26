import { Request, Response } from "express"
import { UpdateUserService } from "../../service/User/UpdateUserService"

export const updateUser = async (req: Request, res: Response) => {

    const updateUserService = new UpdateUserService()

    const result = await updateUserService.execute(req, res)
    
    res.status(200).json({
        message: result,
    })

}