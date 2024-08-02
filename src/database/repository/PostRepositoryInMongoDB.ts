import { Request } from "express"
import Post from "../../model/post/Post"
import { PostRepository } from "../../controller/Post/repository/PostRepository"
import { LoginService } from "../../service/User/LoginService"
import { GetUserByIdService } from "../../service/User/GetUserByIdService"
import { UserRepositoryInMongoDB } from "./UserRepositoryInMongoDB"

const loginService = new LoginService()
const repository = new UserRepositoryInMongoDB()
const getUserByIdService = new GetUserByIdService(repository)

export class PostRepositoryInMongoDB implements PostRepository {

    async save(req: Request) {

        const { title, description, discipline } = req.body
        const authorization = req.headers.authorization

        if(authorization !== undefined) {

            const userId = loginService.getUserIdFromToken(authorization)

            if (!userId) {
                throw new Error('userId environment variable is not set!');
            }

            const user = await getUserByIdService.execute(userId)

            if (!user) {
                throw new Error(`User ${userId} not found!`);
            }

            const post = {
                title,
                description,
                author: user.email,
                discipline: discipline.id
            }

            const newPost = await Post.create(post)
            return newPost
        }
        
    }

    async getAll() {
        return await Post.find().populate('discipline')
    }

    async getById(id: string) {
        return await Post.findById(id).populate('discipline')
    }

    async getByText(regex: RegExp) {

        const posts = await Post.find({
            $or: [
                { title: regex },
                { description: regex },
            ],
        }).populate('discipline');
        return posts
    }

    async update(req: Request) {

        const id = req.params.id
        const { title, description, discipline } = req.body
        const authorization = req.headers.authorization
        
        if (authorization !== undefined) {

            const userId = loginService.getUserIdFromToken(authorization)

            if (!userId) {
                throw new Error('userId environment variable is not set!');
            }
    
            const user = await getUserByIdService.execute(userId)
    
            if (!user) {
                throw new Error(`User ${userId} not found!`);
            }
    
            const post = {
                id: id,
                title: title,
                description: description,
                author: user.email,
                discipline: discipline.id,
                updatedAt: Date.now()
            }
            return await Post.updateOne({_id: id}, post)
        }
    }

    async delete(req: Request) {
        const id = req.params.id
        return await Post.deleteOne({_id: id})
    }
}