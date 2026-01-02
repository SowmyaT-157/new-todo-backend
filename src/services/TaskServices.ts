import { db } from "../config/Firebase";
import TaskType from "../types/TaskType";

const collectionTask = db.collection("tasks")

export const addTheTask = async(taskdata:TaskType)=>{
    const task = await collectionTask.doc(taskdata.id).set(taskdata)
    console.log("show task data",task);
    return taskdata;
}


