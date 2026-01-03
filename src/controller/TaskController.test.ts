
import request from "supertest";
import express from "express";

jest.mock("../services/TaskServices.ts");
import { addTheTask, editTheTask, getTheTask, removeTheTask } from "../services/TaskServices";
import { addTask, editTask, getTask, taskDelete } from "./TaskController";
const mockGetTheTask = getTheTask as jest.Mock;
const mockAddTask = addTheTask as jest.Mock;
const mockRemoveTask = removeTheTask as jest.Mock;
const mockUpdateTask = editTheTask as jest.Mock;


const app = express();
app.use(express.json());

app.post('/', addTask)
app.get('/', getTask)
app.delete('/:id', taskDelete)
app.put('/:id', editTask)

describe("it should check the all the methods are working properly", () => {
    beforeEach(() => {
        jest.clearAllMocks();

    })
    test("should return a all list of tasks, if successfully get show a 200 status code", async () => {
        const mockTasks = [{ id: "1", name: "health" }];
        mockGetTheTask.mockResolvedValue(mockTasks);
        const response = await request(app).get("/");
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("successfully get the all tasks");
        expect(mockGetTheTask).toHaveBeenCalledTimes(1);
    });
    test("it should return a 400 status code if the tasks are not returned", async () => {
        mockGetTheTask.mockResolvedValue(null);
        const response = await request(app).get("/");
        expect(response.status).toBe(400);
    });
    test("it should show a 201 status code if new task added successfully", async () => {
        const newTask = { title: "biryani" };
        mockAddTask.mockResolvedValue({ id: "2", ...newTask });
        const response = await request(app)
            .post("/")
            .send(newTask)
            .expect("Content-Type", /json/);
        expect(response.status).toBe(201);
        expect(mockAddTask).toHaveBeenCalledWith(newTask);
    });
    test("it should return a 500 if internal server error when task not created", async () => {
        const newTask = { title: "breakfast" };
        mockAddTask.mockRejectedValue(new Error("Invalid data"));
        const response = await request(app).post("/").send(newTask);
        expect(response.status).toBe(500);
        expect(response.body.message).toBe("internal server issue");
    });
    test("it should delete the task when the task is found ", async () => {
      const taskId = "1";
      mockRemoveTask.mockResolvedValue({ success: true });
      const response = await request(app).delete(`/${taskId}`);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("successfully deleted the task");
      expect(mockRemoveTask).toHaveBeenCalledWith(taskId);
    });



})