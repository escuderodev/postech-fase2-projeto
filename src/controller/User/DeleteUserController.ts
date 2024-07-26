import { Request, Response } from "express"
import { DeleteUserService } from "../../service/User/DeleteUserService"
import User from "../../model/user/User"

export const deleteUser = async (req: Request, res: Response) => {

    const deleteUserService = new DeleteUserService()
    const id = req.params.id

    const user = await User.findById({_id: id})
    if(!user) {
      res.status(200).json({message: `User Id ${req.params.id} not found!`})
      return
    }
    
    try {
        await deleteUserService.execute(req)
        res.status(200).json({message: 'User deleted!'})
    } catch (error) {
        res.status(500).json({erro: error})
    }
}