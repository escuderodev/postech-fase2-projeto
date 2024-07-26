import { Request, Response } from "express"
import { PostRepository } from "../../database/repository/PostRepositoryInMongoDB"
import Discipline from "../../model/discipline/Discipline";

export class CreatePostService {

    async execute(req: Request, res: Response) {

        const postRepository = new PostRepository()

        const { title, description, discipline } = req.body;

        // validations
        // check requireds fields
        const existingDiscipline = await Discipline.findById(discipline.id);
        if (!existingDiscipline) {
            return res.status(404).json({ message: 'Disciplina não encontrada' });
        }

        // create post
        return postRepository.save(req)
    }
}