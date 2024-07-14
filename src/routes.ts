import { Router } from "express"
import { PrismaClient } from "@prisma/client"
import { createUser } from "./controller/User/CreateUserController"
import { getAllUsers } from "./controller/User/GetAllUsersController"
import { getUserById } from "./controller/User/GetUserByIdController"
import { updateUser } from "./controller/User/UpdateUserController"
import { deleteUser } from "./controller/User/DeleteUserController"
import { login } from "./controller/User/LoginController"

const prisma = new PrismaClient()

const router = Router()

//login
router.post("/login", login)

// criar usuário
router.post("/users", createUser)

// listar todos os usuários
router.get("/users", getAllUsers)

// listar apenas um usuário
router.get("/users/:id", getUserById)

// atualizar usuário
router.put("/users/:id", updateUser)

// deletar usuário
router.delete("/users/:id", deleteUser)

export {router}