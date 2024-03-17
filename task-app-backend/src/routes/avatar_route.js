const { Router } = require("express");
const { Avatar } = require("../dao/Avatar");

const avatar_router = Router();

avatar_router.get("/", async (request, response, next) =>{
	try{
   const result = await Avatar.getAll()
   return response.json(result)
	} catch (err){
		next(err)
	}
})

avatar_router.get("/:id",async (request, response, next) =>{
	try{
	 const id = request.params.id
   const result = await Avatar.getWhere("id=$1",[id])
   return response.json(result)
	} catch (err){
		next(err)
	}
})

module.exports = avatar_router