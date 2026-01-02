import { Request, Response } from "express"
import { addTheTask, getTheTask } from "../services/TaskServices"

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
            return res.status(200).json({ message: "successfully get the all tasks" })
        } else {
            return res.status(400).json({ message: "Bad Request" })
        }
    } catch {
        return res.status(500).json({ message: "internal server error" })
    }
}