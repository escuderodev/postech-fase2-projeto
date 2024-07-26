import { Request, Response } from "express"
import { GetPostByIdService } from "../../service/Post/GetPostByIdService"

export const getPostById = async (req: Request, res: Response) => {

  const getPostByIdService = new GetPostByIdService()
  const post = await getPostByIdService.execute(req)

  if(!post) {
    res.status(200).json({message: `Post Id ${req.params.id} not found!`})
    return
  }
  
  res.status(200).json({message: post})
}