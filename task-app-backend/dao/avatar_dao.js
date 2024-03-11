const { pool } = require("../db_connect");


class AvatarDao {

    static async addAvatar({filename, name}) {

    }

    static async getAllAvatars() {
        const result = await pool.query(`select * from pestotask.avatar`)
        return result.rows
    }

    static async getAvatarById(id) {
        const result = await pool.query(`select * from pestotask.avatar where id=$1`,[id])
        if(result.rowCount>0){
            return result.rows[0]
        } else {
            return null;
        }
    }
    
    static async updateAvatarFieldById(id, fieldName, fieldValue) {
        const result = await pool.query(`update pestotask.avatar set ${fieldName}=$1 where id=$2`,[fieldValue,id])
        return result.rows
    }
}

module.exports = {
    AvatarDao
}