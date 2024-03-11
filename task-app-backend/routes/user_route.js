const {Router} = require('express')
const { UserDao } = require('../dao/user_dao')

const user_router = Router()


const removeSensitiveFields = (object, field_list) => {
   field_list.forEach(field => {
      delete object[field]
   });
   return object
}

user_router.get("/",async (request, response, next)=> {
   try {
    const user_list = await UserDao.getUserById(request.user_id)
    const remove_user_fields = ["password","verify_hash","reset_hash"]
    const refined_user_list = user_list.map((user)=>removeSensitiveFields(user,remove_user_fields))

    return response.json(refined_user_list)
   } catch (error) {
    return next(error)
   }
   
})

user_router.patch("/", async (request, response, next)=> {
   try {
      console.log(request.body)
      const updateAbleFields = ["name","avatar"]
      const users = await UserDao.getUserById(request.user_id)
      if(users.length === 0)
         throw new Error("User does'nt exist")

      const user = users[0]
      delete user.link
      delete user.avatar_name
      updateAbleFields.forEach(field => {
         if(request.body[field]){
            user[field]=request.body[field]
         }
      });
      console.log(user)
      await UserDao.updateUserById(request.user_id, user)

      response.json({"message":"updated successfully"})
   } catch (error) {
      return next(error)
   }
})



module.exports = user_router