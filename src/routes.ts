import { Router } from "express"
import { PrismaClient } from "@prisma/client"
import { createUser } from "./controller/User/CreateUserController"
import { getAllUsers } from "./controller/User/GetAllUsersController"
import { getUserById } from "./controller/User/GetUserByIdController"
import { updateUser } from "./controller/User/UpdateUserController"
import { deleteUser } from "./controller/User/DeleteUserController"
import { login } from "./controller/User/LoginController"
import { LoginService } from "./service/User/LoginService"

const prisma = new PrismaClient()

const router = Router()

const loginService = new LoginService()

//login
router.post("/login", login)

// criar usuário
router.post("/users", loginService.checkToken, createUser)

// listar todos os usuários
router.get("/users", getAllUsers)

// listar apenas um usuário
router.get("/users/:id", getUserById)

// atualizar usuário
router.put("/users/:id", loginService.checkToken, updateUser)

// deletar usuário
router.delete("/users/:id", loginService.checkToken, deleteUser)

export {router}