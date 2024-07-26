import { Request, Response } from "express"
import { CreatePostService } from "../../service/Post/CreatePostService"

export const createPost = async (req: Request, res: Response) => {

    const createPostService = new CreatePostService()

    try {
        await createPostService.execute(req, res)
        res.status(201).json({
            message: "create post is success!"
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Save post error' });
    }
}