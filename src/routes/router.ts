import Router from "express"
import { addTask, editTask, getTask, taskDelete} from "../controller/TaskController"

export const router = Router()
router.post('/addnewTask', addTask)
router.get('/getTasks',getTask)
router.delete('/deleteTask/:id',taskDelete)
router.put('/taskEdit/:id',editTask)