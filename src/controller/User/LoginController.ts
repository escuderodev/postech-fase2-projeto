import { Request, Response } from "express"
import { LoginService } from "../../service/User/LoginService"

export const login = async (req: Request, res: Response) => {

    const loginService = new LoginService()
    const result = await loginService.execute(req, res)
    return res.status(200).json({
        message: 'user authenticated',
        result: result
    })
}