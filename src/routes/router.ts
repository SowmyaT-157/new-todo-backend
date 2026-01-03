import Router from "express"
import { addTask, getTask, taskDelete } from "../controller/TaskController"

export const router = Router()
router.post('/addnewTask', addTask)
router.get('/getTasks',getTask)
router.delete('/deleteTask/:id',taskDelete)