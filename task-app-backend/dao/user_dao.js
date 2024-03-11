const { pool } = require("../db_connect");
const { generateVerifyHash, hashPassword } = require("../utils/user_utils");


class UserDao{
    
    static async addUser({email,password}) {
        const verify_hash = generateVerifyHash()
        const hashed_password = await hashPassword(password)
        const result = await pool.query(`insert into pestotask.user(email,password,is_verified,verify_hash) 
        values ($1,$2,$3,$4)`,[email,hashed_password,false,verify_hash])
        return result.rows
    }   

    static async getAllUsers() {
       const result = await pool.query(`select * from pestotask.user`)
       return result.rows
    }

    static async getUserByEmail(email) {
        const result = await pool.query(`select * from pestotask.user where email =  $1`,[email])
        return result.rows
    }

    static async getUserById(id) {
        const result = await pool.query(`select * from pestotask.user left join pestotask.avatar on pestotask.user.avatar=
        pestotask.avatar.avatar_name  where pestotask.user.id = $1`,[id])
        return result.rows
    }

    static async getUsersByField(fieldName, fieldValue) {
        const result = await pool.query(`select * from pestotask.user where ${fieldName} = $1`,[fieldValue])
        return result.rows
    }

    static async updateUserFieldById(id, fieldName, fieldValue) {
        const result = await pool.query(`update pestotask.user set ${fieldName}=$1 where id=$2`,[fieldValue,id])
        return result.rows
    }

    static async updateUserById(id, user) {
        let dynamicSet = "";
        delete user.id;
        let counter = 1;
        let params = []
        for(let key in user){
            dynamicSet = dynamicSet.concat(`${key}=$${counter},`)
            params.push(user[key])
            counter+=1
        }

        dynamicSet = dynamicSet.substring(0,dynamicSet.length-1)
        params.push(id)
        const result = await pool.query(`update pestotask.user set ${dynamicSet} where id=$${counter}`,params)
        return result.rows
    }
    
}


module.exports = {
    UserDao
}