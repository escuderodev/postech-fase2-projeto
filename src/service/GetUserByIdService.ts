import { Request } from "express"
import { UserReposiroty } from "../repository/UserReposiroty"
import { UserDTO } from "../model/UserDTO"

export class GetUserByIdService  {

    async execute(req: Request) {

        const userReposiroty = new UserReposiroty()
        const userSearch = await userReposiroty.getById(req)
        const userDTO: UserDTO = new UserDTO(userSearch?.id, userSearch?.name, userSearch?.email)
        return userDTO
    }
}