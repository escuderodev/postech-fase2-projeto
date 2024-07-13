import { Request, Response } from "express"
import { DeleteUserService } from "../service/DeleteUserService"

export const deleteUser = async (req: Request, res: Response) => {

    const deleteUserService = new DeleteUserService()

    try {
        await deleteUserService.execute(req)
        return res.status(200).json({message: 'User deleted!'})
    } catch (error) {
        return res.status(200).json({
            message: `User Id ${req.params.id} not found!`
          })
    }
}