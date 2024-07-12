import express, { json } from "express"
import "dotenv/config"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jsonwebtoken from "jsonwebtoken"
import { User } from "./model/User.js"

const app = express()
const PORT = process.env.PORT
const jwt = jsonwebtoken
const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASSWORD

app.use(json())

// conectar no banco de dados
mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@api-node-auth.9inpulb.mongodb.net/Auth?retryWrites=true&w=majority&appName=api-node-auth`).then(()=> {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`)
    })
}).catch((error) => console.log(error))

function checkToken(req, res, next) {
    const tokenHeader = req.headers['authorization']
    const token = tokenHeader && tokenHeader.split(" ")[1]

    if(!token) {
        return res.status(401).json({message: "Access denied!"})
    }

    try {
        const secret = process.env.SECRET
        jwt.verify(token, secret)
        next()
    } catch (error) {
        res.status(400).json({message: "Token is not valid!"})
    }
}

// open route
app.get("/", (req, res) => {
    res.status(200).json({message: "Bem vindo a minha api..."})
})

// private route
app.get("/users/:id", checkToken, async (req, res) => {
    const id = req.params.id;

    // check if user exists
    const user = await User.findById(id, "-password");
  
    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado!" });
    }
  
    res.status(200).json({ user });
})

// authenticate user
app.post("/login", async (req, res) => {

    const { email, password } = req.body

    // validations
    if(!email) {
        return res.status(422).json({message: 'email field is required!'})
    }
    if(!password) {
        return res.status(422).json({message: 'password field is required!'})
    }

    // check if users not exists
    const user = await User.findOne({email: email})
    if(!user) {
        return res.status(404).json({message: "user not exists!"})
    }

    // check if password is valid
    const checkPassword = await bcrypt.compare(password, user.password)
    if(!checkPassword) {
        return res.status(422).json({message: "password is not valid!"})
    }

    // check secret
    try {
        const secret = process.env.SECRET
        const token = jwt.sign(
            {
                id: user._id,
            }, 
            secret
        )
        res.status(200).json({message: "User athenticate!", token})

    } catch (error) {
        res.status(500).json({
            message: `server error!`,
            erro: `${error}`})
    }


})

// register user
app.post("/users", async (req, res) => {
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
    const userExists = await User.findOne({email: email})
    if(userExists) {
        return res.status(422).json({message: "email already registered!"})
    }

    // create password
    const salt = await bcrypt.genSalt(12) //add dificult
    const passwordHash = await bcrypt.hash(password, salt) //create password encoded

    // create user
    const user = new User({
        name,
        email,
        password: passwordHash,
    })

    // others errors validation
    try {
        await user.save()
        res.status(201).json({message: "create user is success!"})
        
    } catch (error) {
        res.status(500).json({
            message: `error when trying to register user!`,
            erro: `${error}`})
    }

})