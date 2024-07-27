import { Request } from "express"
import { UserRepositoryInMongoDB } from "../../database/repository/UserRepositoryInMongoDB"

export class GetUserByIdService  {

    constructor(readonly repository: UserRepositoryInMongoDB) {
    }

    async execute(req: Request) {
        const id = req.params.id
        return await this.repository.getById(id)
    }
}