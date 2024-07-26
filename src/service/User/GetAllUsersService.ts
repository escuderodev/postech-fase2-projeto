import { Request } from "express"
import { UserRepository } from "../../database/repository/UserRepositoryInMongoDB"

export class GetAllUsersService  {

    async execute(req: Request) {

        const userRepository = new UserRepository()
        return await userRepository.getAll()
    }
}