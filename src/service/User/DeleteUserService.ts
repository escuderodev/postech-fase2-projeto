import { Request } from "express"
import { UserReposiroty } from "../../repository/UserReposiroty"

export class DeleteUserService  {

    async execute(req: Request) {

        const userReposiroty = new UserReposiroty()
        return userReposiroty.delete(req)
    }
}