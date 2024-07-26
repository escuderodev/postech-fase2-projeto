import express, { json } from "express"
import "dotenv/config"
import { userRouter } from "../src/routes/userRoutes"
import { disciplineRouter } from "./routes/disciplineRoutes"
import { postRouter } from "./routes/postRoutes"

export class App {
    private server: express.Application

    constructor() {
        this.server = express()
        this.server.use(json())
        this.server.use(userRouter)
        this.server.use(disciplineRouter)
        this.server.use(postRouter)
        this.server.get("/", (req: express.Request, res: express.Response) => {
            res.status(200).json({message: "Bem vindo a minha API!"})
        })
    }

    public getServer(): express.Application {
        return this.server
    }
}