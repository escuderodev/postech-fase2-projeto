import { Request } from "express"
import { UserRepository } from "../../database/repository/UserRepositoryInMongoDB"

export class DeleteUserService  {

    async execute(req: Request) {
        const userRepository = new UserRepository()
        return userRepository.delete(req)
    }
}