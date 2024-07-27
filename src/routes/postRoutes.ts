import { Request, Response, Router } from "express"
import { LoginService } from "../service/User/LoginService"
import { PostRepositoryInMongoDB } from "../database/repository/PostRepositoryInMongoDB"
import { CreatePostService } from "../service/Post/CreatePostService"
import { CreatePostController } from "../controller/Post/CreatePostController"
import { GetAllPostsService } from "../service/Post/GetAllPostsService"
import { GetAllPostsController } from "../controller/Post/GetAllPostsController"
import { GetPostByIdService } from "../service/Post/GetPostByIdService"
import { GetPostByIdController } from "../controller/Post/GetPostByIdController"
import { UpdatePostService } from "../service/Post/UpdatePostService"
import { UpdatePostController } from "../controller/Post/UpdatePostController"
import { DeletePostService } from "../service/Post/DeletePostService"
import { DeletePostController } from "../controller/Post/DeletePostController"

const postRouter = Router()
const respository = new PostRepositoryInMongoDB()
const loginService = new LoginService()

const createPostService = new CreatePostService(respository)
const createPostController = new CreatePostController(createPostService)

const getAllPostsService = new GetAllPostsService(respository)
const getAllPostsController = new GetAllPostsController(getAllPostsService)

const getPostByIdService = new GetPostByIdService(respository)
const getPostByIController = new GetPostByIdController(getPostByIdService)

const updatePostService = new UpdatePostService(respository)
const updatePostController = new UpdatePostController(updatePostService)

const deletePostService = new DeletePostService(respository)
const deletePostController = new DeletePostController(deletePostService)

// criar
postRouter.post("/posts", loginService.checkToken, (req: Request, res: Response) => {
    createPostController.createPost(req, res)
})

// // listar todos
postRouter.get("/posts", (req: Request, res: Response) => {
    getAllPostsController.getAllPosts(req, res)
})

// // listar apenas um
postRouter.get("/posts/:id", (req: Request, res: Response) => {
    getPostByIController.getPostById(req, res)
})

// // atualizar
postRouter.put("/posts/:id", loginService.checkToken, (req: Request, res: Response) => {
    updatePostController.updatePost(req, res)
})

// // deletar
postRouter.delete("/posts/:id", loginService.checkToken, (req: Request, res: Response) => {
    deletePostController.deletePost(req, res)
})

export { postRouter }