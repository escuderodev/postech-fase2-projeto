import { Request } from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export class UserReposiroty {
    async save(req: Request, passwordHash: string) {
        const user = await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                password: passwordHash
            },
            select: {
                id: true,
                name: true,
                email: true,
                password: false
            }
        })
        return user
    }

    async getAll() {
        return await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                password: false
            }
        })
    }

    async getById(req: Request) {
        const userSearch = await prisma.user.findUnique({
            where: {
              id: req.params.id,
            },
            select: {
                id: true,
                name: true,
                email: true,
                password: false
            }
          })
          return userSearch
    }

    async getByEmail(email: string) {
        const userSearch = await prisma.user.findUnique({
            where: {
              email: email,
            }
          })
          return userSearch
    }

    async update(req: Request, passwordHash: string) {
        return await prisma.user.update({
            where: {
                id: req.params.id
            },
            data: {
                name: req.body.name,
                email: req.body.email,
                password: passwordHash
            },
            select: {
                id: true,
                name: true,
                email: true,
                password: false
            }
        })
    }

    async delete(req: Request) {
        await prisma.user.delete({
            where: {
                id: req.params.id
            }
        })
    }
}