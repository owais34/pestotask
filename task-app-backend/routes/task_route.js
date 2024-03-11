const { Router, request, response } = require("express");
const { TaskDao } = require("../dao/task_dao");
const { validateMandatoryFields } = require("../utils/validation_utils");

const task_router = Router();

task_router.get("/", async(request, response, next) => {
    try {
        const tasks = await TaskDao.getTasksByUserId(request.user_id)
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
        const result = await TaskDao.createTask(task)
        return response.json({"message":"Task added successfully"})
    } catch (error) {
        next(error)
    }
})

task_router.patch("/:id",async(request ,response, next) => {
    try {
        request.body.updation_date = new Date().toISOString().substring(0,10)
        const updateAbleFields = ["title","description","status","updation_date"]

        if(request.body.status && request.body.status === "Completed")
            request.body.completion_date = new Date().toISOString().substring(0,10)

        const task = {}

        updateAbleFields.forEach(field => {
            if(request.body[field]){
               validateMandatoryFields(request.body, [field])
               task[field]=request.body[field]
            }
         });
        
        await TaskDao.updateTaskById(request.params.id, task, request.user_id)
        response.json({"message":"Updated Task Successfully"})
    } catch (error) {
        next(error)
    }
})

task_router.delete("/:id", async(request ,response, next) => {
    try {
        await TaskDao.deleteTaskById(request.params.id, request.user_id)
        response.json({"message":"Updated Task Successfully"})
    } catch (error) {
        next(error)
    }
})

module.exports = task_router