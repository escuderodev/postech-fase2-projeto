import express, { json } from "express"
import "dotenv/config"
import { router } from "./routes"

const app = express()

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

app.use(json())
app.use(router)