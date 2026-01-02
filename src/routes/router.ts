import Router from "express"
import { addTask, getTask } from "../controller/TaskController"

export const router = Router()
router.post('/addnewTask', addTask)
router.get('/getTasks',getTask)