import { Request } from "express"
import { UserReposiroty } from "../../repository/UserReposiroty"

export class GetAllUsersService  {

    async execute(req: Request) {

        const userReposiroty = new UserReposiroty()
        const userList = await userReposiroty.getAll()
        return await userReposiroty.getAll()
    }
}