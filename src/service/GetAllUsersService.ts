import { Request } from "express"
import { UserReposiroty } from "../repository/UserReposiroty"

export class GetAllUsersService  {

    async execute(req: Request) {

        const userReposiroty = new UserReposiroty()
        return await userReposiroty.getAll()
    }
}