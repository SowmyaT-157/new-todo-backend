
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
import { addTheTask } from "./TaskServices";

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
})
