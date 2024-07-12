import { Request, Response } from "express"
import { UserReposiroty } from "../repository/UserReposiroty"
import bcrypt from "bcrypt"
import jsonwebtoken from "jsonwebtoken"

export class CreateUserService  {

    async execute(req: Request, res: Response) {

        const userReposiroty = new UserReposiroty()

        const { name, email, password, confirmPassword} = req.body

        // validations
    
        // check requireds fields
        if(!name) {
            return res.status(422).json({message: 'name field is required!'})
        }
        if(!email) {
            return res.status(422).json({message: 'email field is required!'})
        }
        if(!password) {
            return res.status(422).json({message: 'password field is required!'})
        }
        if(password !== confirmPassword) {
            return res.status(422).json({message: 'password and confirmPassword are not the same!'})
        }
    
        // check if users not exists
        // const userExists = await User.findOne({email: email})
        const userExists = await userReposiroty.getById(req)

        if(userExists) {
            return res.status(422).json({message: "email already registered!"})
        }
    
        // create password
        const salt = await bcrypt.genSalt(12) //add dificult
        const passwordHash = await bcrypt.hash(password, salt) //create password encoded
    
        // create user
        // const user = new User({
        //     name,
        //     email,
        //     password: passwordHash,
        // })
    
        // // others errors validation
        // try {
        //     await user.save()
        //     res.status(201).json({message: "create user is success!"})
            
        // } catch (error) {
        //     res.status(500).json({
        //         message: `error when trying to register user!`,
        //         erro: `${error}`})
        // }

        return userReposiroty.save(req, passwordHash)

    }
}