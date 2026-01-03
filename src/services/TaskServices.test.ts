
const mockDelete = jest.fn();
const mockSet = jest.fn();
const mockUpdate = jest.fn();
const mockGet = jest.fn();

const mockDoc = jest.fn((id) => ({
    delete: mockDelete,
    set: mockSet,
    update: mockUpdate
}));

const mockCollection = jest.fn(() => ({
    doc: mockDoc,
    get: mockGet
}))

jest.mock("../config/Firebase.ts", () => ({
    db: {
        collection: mockCollection,
    }
}))

import TaskType from "../types/TaskType";
import { addTheTask, editTheTask, getTheTask, removeTheTask } from "./TaskServices";

const MockData: TaskType = {
    id: "1",
    name: "dinner",
    description: "plan to go dinner",
    status: "pending",
    priority: "low",
    deadline: "today"
}
describe("it should check all functionalities are working properly", () => {

    test("it should addTask user can add new task", async () => {
        mockSet.mockResolvedValue(undefined);
        const result = await addTheTask(MockData);
        expect(mockDoc).toHaveBeenCalledWith(MockData.id);
        expect(mockSet).toHaveBeenCalledWith(MockData);
        expect(result).toEqual(MockData);
    });
    test(" it should check the get method all the tasks are returned properly", async () => {
        mockGet.mockResolvedValue({
            docs: [{ data: () => MockData }],
        });
        const tasks = await getTheTask();
        expect(mockGet).toHaveBeenCalledTimes(1);
    });

    test("it should remove task delete a task by using id", async () => {
        const taskId = MockData.id;
        mockDelete.mockResolvedValue(undefined);
        await removeTheTask(taskId);
        expect(mockDoc).toHaveBeenCalledWith(taskId);
        expect(mockDelete).toHaveBeenCalledTimes(1);
    });
    test("it should edit the data, if already existing id we can edit that task", async () => {
        const taskId = MockData.id;
        const updatedData = { ...MockData, name: "Coffee" };
        mockGet.mockResolvedValue({
            docs: [{ data: () => MockData, id: taskId }],
        });
        mockUpdate.mockResolvedValue(undefined);
        await editTheTask(taskId, updatedData);
        expect(mockGet).toHaveBeenCalledTimes(2);
        expect(mockDoc).toHaveBeenCalledWith(taskId);
        expect(mockUpdate).toHaveBeenCalledWith(updatedData);
    });
    it("Should show a non existend id, if user try to update a non existing id", async () => {
        const idNotFound = "id not matched to the any task";
        mockGet.mockResolvedValue({
            docs: [{ data: () => MockData, id: MockData.id }],
        });
        const result = await editTheTask(idNotFound, MockData);
        expect(mockGet).toHaveBeenCalledTimes(3);
    });


})
