import Router from "express"
import { addTask } from "../controller/TaskController"

export const router = Router()
router.post('/addnewTask', addTask)
