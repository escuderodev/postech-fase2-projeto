import { Request } from "express"
import { UserRepository } from "../../database/repository/UserRepositoryInMongoDB"

export class GetUserByIdService  {

    async execute(req: Request) {
        const userRepository = new UserRepository()
        const id = req.params.id
        return await userRepository.getById(id)
    }
}