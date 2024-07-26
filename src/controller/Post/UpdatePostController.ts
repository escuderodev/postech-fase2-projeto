import { Request, Response } from "express"
import { UpdatePostService } from "../../service/Post/UpdatePostService"

export const updatePost = async (req: Request, res: Response) => {

    const updatePostService = new UpdatePostService()

    const result = await updatePostService.execute(req)
    
    res.status(200).json({
        message: result,
    })

}