import { Request, Response } from "express"
import { GetAllPostsService } from "../../service/Post/GetAllPostsService"

export const getAllPosts = async (req: Request, res: Response) => {

    const getAllPostsService = new GetAllPostsService()
    const postList = await getAllPostsService.execute(req)
    res.status(200).json({postList})
}