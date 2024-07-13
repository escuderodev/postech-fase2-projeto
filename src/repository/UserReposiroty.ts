import { Request } from "express"
import { PrismaClient } from "@prisma/client"
import { UserDTO } from "../model/UserDTO"

const prisma = new PrismaClient()

export class UserReposiroty {
    async save(req: Request, passwordHash: string) {
        const user = await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                password: passwordHash
            }
        })

        const userDTO = new UserDTO(user.id, user.name, user.email)
        return userDTO
    }

    async delete(req: Request) {
        await prisma.user.delete({
            where: {
                id: req.params.id
            }
        })
    }

    async getAll() {
        return await prisma.user.findMany()
    }

    async getById(req: Request) {
        const userSearch = await prisma.user.findUnique({
            where: {
              id: req.params.id,
            },
          })
          return userSearch
    }

    async getByEmail(req: Request) {
        const userSearch = await prisma.user.findUnique({
            where: {
              email: req.body.email,
            },
          })
          return userSearch
    }

    async update(req: Request) {
        console.log(req.params.id)
        return await prisma.user.update({
            where: {
                id: req.params.id
            },
            data: {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }
        })
    }
}