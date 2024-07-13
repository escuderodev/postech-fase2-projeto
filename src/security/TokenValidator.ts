// import bcrypt from "bcrypt"
// import { NextFunction } from "express"
// import jsonwebtoken from "jsonwebtoken"

// const jwt = jsonwebtoken

// export class TokenValidator {

//     static checkToken(req: Request, res: Response, next: NextFunction) {
//         const tokenHeader = req.headers['authorization']
//         const token = tokenHeader && tokenHeader.split(" ")[1]
    
//         if(!token) {
//             return res.status(401).json({message: "Access denied!"})
//         }
    
//         try {
//             const secret = process.env.SECRET
//             jwt.verify(token, secret)
//             next()
//         } catch (error) {
//             res.status(400).json({message: "Token is not valid!"})
//         }
//     }
// }