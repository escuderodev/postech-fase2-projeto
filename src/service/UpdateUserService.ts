import { Request } from "express"
import { UserReposiroty } from "../repository/UserReposiroty"

export class UpdateUserService  {

    async execute(req: Request) {

        const userReposiroty = new UserReposiroty()
        return await userReposiroty.update(req)
    }
}