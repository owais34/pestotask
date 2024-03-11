const { Router } = require("express");
const { AvatarDao } = require("../dao/avatar_dao");

const avatar_router = Router();

avatar_router.get("/", async (request, response, next) =>{
	try{
   const result = await AvatarDao.getAllAvatars()
   return response.json(result)
	} catch (err){
		next(err)
	}
})

avatar_router.get("/:id",async (request, response, next) =>{
	try{
	 const id = request.params.id
   const result = await AvatarDao.getAvatarById(id)
   return response.json(result)
	} catch (err){
		next(err)
	}
})

module.exports = avatar_router