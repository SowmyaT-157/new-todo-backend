import { db } from "../config/Firebase";
import TaskType from "../types/TaskType";

const collectionTask = db.collection("tasks")

export const addTheTask = async (taskdata: TaskType) => {
    const task = await collectionTask.doc(taskdata.id).set(taskdata)
    console.log("show task data", task);
    return taskdata;
}

export const getTheTask = async () => {
    const allTasks = await collectionTask.get()
    const tasks = allTasks.docs.map(doc => doc.data())
    return tasks
}

export const removeTheTask = async (id: string) => {
    const deleteTheTask = await collectionTask.doc(id).delete()
    return deleteTheTask
}

export const editTheTask = async (id: string,data:TaskType) => {
    const task = await collectionTask.get()
    const tasks = task.docs.find((doc) => doc.id === id)
    if (!tasks) {
        return "any task is not available to this id"
    } else {
        return collectionTask.doc(id).update(data)
    }
}

