import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import "dotenv/config"
import { UserRepository } from "../../database/repository/UserRepositoryInMongoDB"

// const secret = process.env.SECRET

export class LoginService {

    async execute(req: Request, res: Response) {

        const userRepository = new UserRepository()
        const { email, password } = req.body

        // check if users not exists
        const user = await userRepository.getByEmail(email)
        console.log(`GetByEmail: ${user}`)
        if(!user) {
            return res.status(422).json({message: "mail or password is not valid!"})
        }

        // check if password is valid
        const checkPassword = await bcrypt.compare(password, user.password)
        if(!checkPassword) {
            return res.status(422).json({message: "password is not valid!"})
        }
    
        //user authentication
        const secret = process.env.SECRET
        const token = jwt.sign({id: user.id}, secret ?? '', {expiresIn: '1h'})
        return {
            userId: user.id,
            token: token
        }
    }

    async checkToken(req: Request, res: Response, next: Function) {
        const tokenHeader = req.headers['authorization']
        const token = tokenHeader && tokenHeader.split(" ")[1]
    
        if(!token) {
            return res.status(401).json({message: "Access denied!"})
        }
    
        try {
            const secret = process.env.SECRET
            jwt.verify(token, secret ?? '')
            next()
        } catch (error) {
            res.status(400).json({message: "Token is not valid!"})
        }
    }
}