import { Request } from "express"
import { UserReposiroty } from "../repository/UserReposiroty"
import { UserDTO } from "../model/UserDTO"

export class GetUserByIdService  {

    async execute(req: Request) {

        const userReposiroty = new UserReposiroty()
        return await userReposiroty.getById(req)
    }
}