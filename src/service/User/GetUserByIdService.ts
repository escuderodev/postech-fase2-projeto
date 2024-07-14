import { Request } from "express"
import { UserReposiroty } from "../../repository/UserReposiroty"

export class GetUserByIdService  {

    async execute(req: Request) {

        const userReposiroty = new UserReposiroty()
        return await userReposiroty.getById(req)
    }
}