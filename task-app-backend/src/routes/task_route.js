const { Router, request, response } = require("express");
const { validateMandatoryFields } = require("../utils/validation_utils");
const { Task } = require("../dao/Task");

const task_router = Router();

task_router.get("/", async(request, response, next) => {
    try {
        const tasks = await Task.getWhere("user_id=$1",[request.user_id])
        return response.json(tasks)
    } catch (error) {
        next(error)
    }
})

task_router.post("/", async(request, response, next) => {
    try {
        const mandatoryFields = ["title","description"]
        validateMandatoryFields(request.body, mandatoryFields)
        const date = new Date().toISOString().substring(0,10)

        const task = {
            title: request.body.title,
            description: request.body.description,
            creation_date: date,
            updation_date: date,
            status: "To Do",
            user_id: request.user_id
        }
        const result = await Task.add(task)
        return response.json({"message":"Task added successfully"})
    } catch (error) {
        next(error)
    }
})

task_router.patch("/:id",async(request ,response, next) => {
    try {
        request.body.updation_date = new Date().toISOString().substring(0,10)
        if(request.body.status && request.body.status === "Completed")
            request.body.completion_date = new Date().toISOString().substring(0,10)
        request.body.id = request.params.id
        const task = request.body
        await Task.update(task)
        response.json({"message":"Updated Task Successfully"})
    } catch (error) {
        next(error)
    }
})

task_router.delete("/:id", async(request ,response, next) => {
    try {
        const task = {id: request.params.id}
        await Task.delete(task)
        response.json({"message":"Deleted Task Successfully"})
    } catch (error) {
        next(error)
    }
})

module.exports = task_router