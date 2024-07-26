import { Router } from "express"
import { createUser } from "../controller/User/CreateUserController"
import { getAllUsers } from "../controller/User/GetAllUsersController"
import { getUserById } from "../controller/User/GetUserByIdController"
import { updateUser } from "../controller/User/UpdateUserController"
import { deleteUser } from "../controller/User/DeleteUserController"
import { login } from "../controller/User/LoginController"
import { LoginService } from "../service/User/LoginService"

const userRouter = Router()

const loginService = new LoginService()

// login
userRouter.post("/login", login)

// criar usuário
userRouter.post("/users", createUser)

// // listar todos os usuários
userRouter.get("/users", getAllUsers)

// // listar apenas um usuário
userRouter.get("/users/:id", getUserById)

// // atualizar usuário
userRouter.put("/users/:id", loginService.checkToken, updateUser)

// // deletar usuário
userRouter.delete("/users/:id", loginService.checkToken, deleteUser)

export {userRouter}