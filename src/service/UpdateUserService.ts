import { Request } from "express"
import { UserReposiroty } from "../repository/UserReposiroty"
import bcrypt from "bcrypt"

export class UpdateUserService  {

    async execute(req: Request) {

        const userReposiroty = new UserReposiroty()
        const password = req.body.password

        // create password encoded
        const salt = await bcrypt.genSalt(12) //add dificult
        const passwordHash = await bcrypt.hash(password, salt) //create password encoded
        
        return await userReposiroty.update(req, passwordHash)
    }
}