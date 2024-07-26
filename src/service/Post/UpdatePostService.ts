import { Request } from "express"
import { PostRepository } from "../../database/repository/PostRepositoryInMongoDB"
import Post from "../../model/post/Post"

export class UpdatePostService  {

    async execute(req: Request) {

        const postRepository = new PostRepository()
        const id = req.params.id

        const post = await Post.findById({_id: id})

        if(!post) {
            return `Post Id ${id} not found!`
        }

        await postRepository.update(req)
        return `Post update is success!`
    }
}