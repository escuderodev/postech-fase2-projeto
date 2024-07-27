import { Request, Response, Router } from "express"
import { UserRepositoryInMongoDB } from "../database/repository/UserRepositoryInMongoDB"
import { login } from "../controller/User/LoginController"
import { LoginService } from "../service/User/LoginService"
import { CreateUserService } from "../service/User/CreateUserService"
import { CreateUserController } from "../controller/User/CreateUserController"
import { GetAllUsersService } from "../service/User/GetAllUsersService"
import { GetAllUsersController } from "../controller/User/GetAllUsersController"
import { GetUserByIdService } from "../service/User/GetUserByIdService"
import { GetUserByIdController } from "../controller/User/GetUserByIdController"
import { UpdateUserService } from "../service/User/UpdateUserService"
import { UpdateUserController } from "../controller/User/UpdateUserController"
import { DeleteUserService } from "../service/User/DeleteUserService"
import { DeleteUserController } from "../controller/User/DeleteUserController"

const userRouter = Router()
const respository = new UserRepositoryInMongoDB()
const loginService = new LoginService()

const createUserService = new CreateUserService(respository)
const createUserController = new CreateUserController(createUserService)

const getAllUsersService = new GetAllUsersService(respository)
const getAllUsersController = new GetAllUsersController(getAllUsersService)

const getUserByIdService = new GetUserByIdService(respository)
const getUserByIdController = new GetUserByIdController(getUserByIdService)

const updateUserService = new UpdateUserService(respository)
const updateUserController = new UpdateUserController(updateUserService)

const deleteUserService = new DeleteUserService(respository)
const deleteUserController = new DeleteUserController(deleteUserService)

// login
userRouter.post("/login", login)

// criar
userRouter.post("/users", (req: Request, res: Response) => {
    createUserController.createUser(req, res)
})

// // listar todos
userRouter.get("/users", (req: Request, res: Response) => {
    getAllUsersController.getAllUsers(req, res)
})

// // listar apenas um
userRouter.get("/users/:id", (req: Request, res: Response) => {
    getUserByIdController.getUserById(req, res)
})

// // atualizar
userRouter.put("/users/:id", loginService.checkToken, (req: Request, res: Response) => {
    updateUserController.updateUser(req, res)
})

// // deletar
userRouter.delete("/users/:id", loginService.checkToken, (req: Request, res: Response) => {
    deleteUserController.deleteUser(req, res)
})

export {userRouter}