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

