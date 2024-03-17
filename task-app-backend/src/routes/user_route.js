const {Router} = require('express');
const { User } = require('../dao/User');
// const { UserDao } = require('../dao/user_dao')

const user_router = Router()


const removeSensitiveFields = (object, field_list) => {
   field_list.forEach(field => {
      delete object[field]
   });
   return object
}

user_router.get("/",async (request, response, next)=> {
   try {
    //const user_list = await UserDao.getUserById(request.user_id)
    const user_list = await User.getFullUserInfoById(request.user_id)
    const remove_user_fields = ["password","verify_hash","reset_hash"]
    const refined_user_list = user_list.map((user)=>removeSensitiveFields(user,remove_user_fields))

    return response.json(refined_user_list)
   } catch (error) {
    return next(error)
   }
   
})

user_router.patch("/", async (request, response, next)=> {
   try {
      const updateAbleFields = ["name","avatar_id"]
      const users = await User.getWhere("id=$1",[request.user_id])
      if(users.length === 0)
         throw new Error("User does'nt exist")

      const user = users[0]
      updateAbleFields.forEach(field => {
         if(request.body[field]){
            user[field]=request.body[field]
         }
      });

      await User.update(user)

      response.json({"message":"updated successfully"})
   } catch (error) {
      return next(error)
   }
})



module.exports = user_router