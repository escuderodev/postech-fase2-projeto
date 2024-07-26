import { Request, Response, Router } from 'express'
import { DisciplineRepositoryInMongoDB } from "../database/repository/DisciplineRepositoryInMongoDB"
import { LoginService } from "../service/User/LoginService"
import { CreateDisciplineService } from "../service/Discipline/CreateDisciplineService"
import { CreateDisciplineController } from "../controller/Discipline/CreateDisciplineController"
import { GetAllDiscipliniesService } from "../service/Discipline/GetAllDiscipliniesService"
import { GetAllDiscipliniesController } from "../controller/Discipline/GetAllDiscipliniesController"
import { GetDisciplineByIdService } from "../service/Discipline/GetDisciplineByIdService"
import { GetDisciplineByIdController } from "../controller/Discipline/GetDisciplineByIdController"
import { UpdateDisciplineService } from "../service/Discipline/UpdateDisciplineService"
import { UpdateDisciplineController } from "../controller/Discipline/UpdateDisciplineController"
import { DeleteDisciplineService } from "../service/Discipline/DeleteDisciplineService"
import { DeleteDisciplineController } from "../controller/Discipline/DeleteDisciplineController"

const disciplineRouter = Router()
const respository = new DisciplineRepositoryInMongoDB()
const loginService = new LoginService()

const createDisciplineService = new CreateDisciplineService(respository)
const createDisciplineController = new CreateDisciplineController(createDisciplineService)

const getAllDiscipliniesService = new GetAllDiscipliniesService(respository)
const getAllDiscipliniesController = new GetAllDiscipliniesController(getAllDiscipliniesService)

const getDisciplineByIdService = new GetDisciplineByIdService(respository)
const getDisciplineByIdController = new GetDisciplineByIdController(getDisciplineByIdService)

const updateDisciplineService = new UpdateDisciplineService(respository)
const updateDisciplineController = new UpdateDisciplineController(updateDisciplineService)

const deleteDisciplineService = new DeleteDisciplineService(respository)
const deleteDisciplineController = new DeleteDisciplineController(deleteDisciplineService)

// criar task
disciplineRouter.post("/disciplinies", loginService.checkToken, (req: Request, res: Response) => {
    createDisciplineController.createDiscipline(req, res)
})

// // listar todos as tasks
disciplineRouter.get("/disciplinies", (req: Request, res: Response) => {
    getAllDiscipliniesController.getAllDisciplinies(req, res)
})

// // listar apenas uma task
disciplineRouter.get("/disciplinies/:id", (req: Request, res: Response) => {
    getDisciplineByIdController.getDisciplineById(req, res)
})

// // atualizar task
disciplineRouter.put("/disciplinies/:id", loginService.checkToken, (req: Request, res: Response) => {
    updateDisciplineController.updateDiscipline(req, res)
})

// // deletar task
disciplineRouter.delete("/disciplinies/:id", loginService.checkToken, (req: Request, res: Response) => {
    deleteDisciplineController.deleteDiscipline(req, res)
})

export { disciplineRouter }