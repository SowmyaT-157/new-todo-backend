import { Request, Response } from "express"
import { addTheTask } from "../services/TaskServices"

export const addTask = async(req:Request,res:Response)=>{
    try{
       const data = req.body
       const newTask = await addTheTask(data)
       if(newTask){
        return res.status(201).json({message:"successfully created"})
       }else{
        return res.status(400).json({message:"Bad request"})
       }
    }catch(error){
       return res.status(500).json({message:"internal server issue",error})
    }
    
}