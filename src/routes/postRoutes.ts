import { Router } from "express"
import { createPost } from "../controller/Post/CreatePostController"
import { deletePost } from "../controller/Post/DeletePostController"
import { getAllPosts } from "../controller/Post/GetAllPostsController"
import { getPostById } from "../controller/Post/GetPostByIdController"
import { updatePost } from "../controller/Post/UpdatePostController"
import { LoginService } from "../service/User/LoginService"

const postRouter = Router()

const loginService = new LoginService()

// criar task
postRouter.post("/posts", loginService.checkToken, createPost)

// listar todos as tasks
postRouter.get("/posts", getAllPosts)

// listar apenas uma task
postRouter.get("/posts/:id", getPostById)

//  atualizar task
postRouter.put("/posts/:id", loginService.checkToken, updatePost)

//  deletar task
postRouter.delete("/posts/:id", loginService.checkToken, deletePost)

export { postRouter }