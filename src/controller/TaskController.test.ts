
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



})