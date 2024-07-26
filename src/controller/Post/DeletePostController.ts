import { Request, Response } from "express"
import { DeletePostService } from "../../service/Post/DeletePostService"
import Post from "../../model/post/Post"

export const deletePost = async (req: Request, res: Response) => {

    const deletePostService = new DeletePostService()
    const id = req.params.id

    const post = await Post.findById({_id: id})
    if(!post) {
      res.status(200).json({message: `Post Id ${req.params.id} not found!`})
      return
    }
    
    try {
        await deletePostService.execute(req)
        res.status(200).json({message: 'Post deleted!'})
    } catch (error) {
        res.status(500).json({erro: error})
    }
}