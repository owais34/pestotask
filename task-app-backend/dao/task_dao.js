const { pool } = require("../db_connect");


class TaskDao {
    static async getTasksByUserId(user_id){
        const result = await pool.query(`select * from pestotask.task where user_id=$1`,[user_id])
        return result.rows
    }

    static async getTasksByUserId(user_id){
        const result = await pool.query(`select * from pestotask.task where user_id=$1`,[user_id])
        return result.rows
    }

    static async createTask(task) {
        delete task.id
        let dynamicFields = "";
        let dynamicValues = "";
        let counter = 1;
        let params = []
        for(let key in task){
            dynamicFields = dynamicFields.concat(`${key},`)
            dynamicValues = dynamicValues.concat(`$${counter},`)
            params.push(task[key])
            counter+=1
        }
        dynamicFields = dynamicFields.substring(0,dynamicFields.length-1)
        dynamicValues = dynamicValues.substring(0,dynamicValues.length-1)        
        const result = await pool.query(`insert into pestotask.task(${dynamicFields}) values(${dynamicValues})`,params)

        return result.rows
    }

    static async updateTaskFieldById(id, fieldName, fieldValue, user_id) {
        const result = await pool.query(`update pestotask.task set ${fieldName}=$1 where id=$2 and user_id=$3`,[fieldValue,id,user_id])
        return result.rows
    }

    static async updateTaskById(id, task, user_id) {
        let dynamicSet = "";
        delete task.id;
        let counter = 1;
        let params = []
        for(let key in task){
            dynamicSet = dynamicSet.concat(`${key}=$${counter},`)
            params.push(task[key])
            counter+=1
        }

        dynamicSet = dynamicSet.substring(0,dynamicSet.length-1)
        params.push(id)
        params.push(user_id)
        const result = await pool.query(`update pestotask.task set ${dynamicSet} where id=$${counter} 
        and user_id=$${counter+1}`,params)
        return result.rows
    }

    static async deleteTaskById(id,user_id) {
        const result = await pool.query(`delete from pestotask.task where id=$1 and user_id=$2`,[id,user_id])
        return result.rows
    }
}

module.exports = {
    TaskDao
}