import { Request } from "express"
import { PostRepository } from "../../database/repository/PostRepositoryInMongoDB"

export class GetAllPostsService  {

    async execute(req: Request) {

        const postRepository = new PostRepository()
        return await postRepository.getAll()
    }
}