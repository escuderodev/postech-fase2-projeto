import { Request, Response } from "express"
import { GetUserByIdService } from "../service/GetUserByIdService"
import { UserDTO } from "../model/UserDTO"

export const getUserById = async (req: Request, res: Response) => {

  const getUserByIdService = new GetUserByIdService()
  const userDTO: UserDTO = await getUserByIdService.execute(req)

  if(!userDTO) {
    return res.status(200).json({message: `User Id ${req.params.id} not found!`})
  }
  return res.status(200).json({message: userDTO})
}