import { Request, Response } from "express"
import { addTheTask, editTheTask, getTheTask, removeTheTask } from "../services/TaskServices"

export const addTask = async (req: Request, res: Response) => {
    try {
        const data = req.body
        const newTask = await addTheTask(data)
        if (newTask) {
            return res.status(201).json({ message: "successfully created" })
        } else {
            return res.status(400).json({ message: "Bad request" })
        }
    } catch (error) {
        return res.status(500).json({ message: "internal server issue", error })
    }

}

export const getTask = async (req: Request, res: Response) => {
    try {
        const getAllTask = await getTheTask()
        console.log("get the tasks list", getAllTask)
        if (getAllTask) {
            return res.status(200).json({ message: "successfully get the all tasks",getAllTask })
        } else {
            return res.status(400).json({ message: "Bad Request" })
        }
    } catch {
        return res.status(500).json({ message: "internal server error" })
    }
}

export const taskDelete = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const tasks = await removeTheTask(id)
        if (id) {
            return res.status(200).json({ message: "successfully deleted the task" })
        } else {
            return res.status(400).json({ message: "bad request, didn't match any id" })
        }
    } catch {
        return res.status(500).json({ message: "internal server error" })
    }
}

export const editTask = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const data = req.body
        const taskEdit = await editTheTask(id, data)
        if (!taskEdit) {
            return res.status(200).json({ message: "bad request" })
        } else {
            return res.status(400).json({ message: "successfully edit the task" })
        }
    } catch {
        return res.status(500).json({ message: "internal server error" })
    }
}



