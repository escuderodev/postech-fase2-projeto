import mongoose from "mongoose"

const disciplineSchema = new mongoose.Schema({
    title: {type: String, required: true},
    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date}
})

export default mongoose.model("Discipline", disciplineSchema)