import { Router } from "express"
import { PrismaClient } from "@prisma/client"
import { createUser } from "./controller/CreateUserController"
import { getAllUsers } from "./controller/GetAllUsersController"
import { getUserById } from "./controller/GetUserByIdController"
import { updateUser } from "./controller/UpdateUserController"
import { deleteUser } from "./controller/DeleteUserController"
import { TokenValidator } from "./security/TokenValidator"

const prisma = new PrismaClient()

const router = Router()

// criar usuário
router.post("/usuarios", createUser)

// listar todos os usuários
router.get("/usuarios", getAllUsers)

// listar apenas um usuário
router.get("/usuarios/:id", TokenValidator.checkToken, getUserById)

// atualizar usuário
router.put("/usuarios/:id", updateUser)

// deletar usuário
router.delete("/usuarios/:id", deleteUser)

export {router}