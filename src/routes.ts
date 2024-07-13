import { Router } from "express"
import { PrismaClient } from "@prisma/client"
import { createUser } from "./controller/CreateUserController"
import { getAllUsers } from "./controller/GetAllUsersController"
import { getUserById } from "./controller/GetUserByIdController"
import { updateUser } from "./controller/UpdateUserController"
import { deleteUser } from "./controller/DeleteUserController"

const prisma = new PrismaClient()

const router = Router()

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