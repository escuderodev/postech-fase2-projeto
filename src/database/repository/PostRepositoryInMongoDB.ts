import { Request } from "express"
import Post from "../../model/post/Post"
import { PostRepository } from "../../controller/Post/repository/PostRepository";

export class PostRepositoryInMongoDB implements PostRepository {
    
    async save(req: Request) {

        const { title, description, discipline } = req.body;

        const post = {
            title,
            description,
            discipline: discipline.id
        }
        const newPost = await Post.create(post)
        return newPost
    }

    async getAll() {
        return await Post.find().populate('discipline')
    }

    async getById(id: string) {
        return await Post.findById(id).populate('discipline')
    }

    async update(req: Request) {

        const id = req.params.id
        const { title, description, discipline } = req.body

        const post = {
            id: id,
            title: title,
            description: description,
            discipline: discipline.id,
            updatedAt: Date.now()
        }
        return await Post.updateOne({_id: id}, post)
    }

    async delete(req: Request) {
        const id = req.params.id
        return await Post.deleteOne({_id: id})
    }
}