const { Router, response } = require("express");
const { UserDao } = require("../dao/user_dao");
const { hashPassword, verifyPassword, generateResetHash } = require("../utils/user_utils");
var jwt = require("jsonwebtoken");
const { validateMandatoryFields } = require("../utils/validation_utils");
require("dotenv").config();

const signup_router = Router();

signup_router.post("/signup", async (request, response, next) => {
  const signup_info = request.body;
  try {
    const mandatorySignupFields = ["email", "password"];
    // perform validations
    validateMandatoryFields(signup_info, mandatorySignupFields);
    // check if email already exists
    const result = await UserDao.getUserByEmail(signup_info.email);
    validateUserExists(result);

    //create user
    await UserDao.addUser(request.body);

    return response
      .status(201)
      .json({
        message: "created Successfully , verification link sent to email",
      });
  } catch (error) {
    next(error);
  }
});

signup_router.get("/verify/:verify_hash", async (request, response, next) => {
  try {
    const verify_hash = request.params.verify_hash;
		validateMandatoryFields(request.params,["verify_hash"])
    const users = await UserDao.getUsersByField("verify_hash", verify_hash);
    if (users.length === 0) {
			throw new Error("This link doesnt exist")
    } else {
			const user = users[0]
			user.verify_hash = null
			user.is_verified = true
			await UserDao.updateUserById(user.id, user)
			return response.send("<h1>Verified Successfully</h1>")
		}
  } catch (error) {
    next(error);
  }
});

signup_router.post("/login", async (request, response, next) => {
  try {
    const signup_info = request.body;
    const mandatorySignupFields = ["email", "password"];
    validateMandatoryFields(signup_info, mandatorySignupFields);

    const user = await UserDao.getUserByEmail(signup_info.email);
    if (user.length == 0) throw new Error("Email doesnt exist");

		const result = await verifyPassword(signup_info.password, user[0].password)
    if (result) {
      const token = jwt.sign(
        {
          id: user[0].id,
        },
        process.env.JWT_SIGN_KEY
      );

      return response.json({ token });
    } else {
      throw new Error("Wrong Password");
    }
  } catch (error) {
    next(error);
  }
});



signup_router.post("/reset_password", async (request, response, next) => {
	try {
		const info = request.body;
		validateMandatoryFields(info, ["email"])
		const integrityHash = generateResetHash()
		const users =  await UserDao.getUserByEmail(info.email)
		if (users.length !== 0) {
			const user = users[0]
			if(!user.reset_hash){
				user.reset_hash = integrityHash
				await UserDao.updateUserById(user.id, user)
			}
		}
		response.json({"message":"sent password reset email , if account exists"})
	} catch (error) {
		next(error)
	}
})

signup_router.post("/set_password", async(request, response, next) => {
	try {
		const info = request.body
		validateMandatoryFields(info, ["reset_hash","password"])
		const users =  await UserDao.getUsersByField("reset_hash",info.reset_hash)

    if(users.length === 0)
			throw new Error("Invalid reset code")

		const user = users[0]
		user.password = await hashPassword(info.password)
		user.reset_hash = null
    console.log("hereeeeeee")
		await UserDao.updateUserById(user.id, user)

		response.json({"message":"password updated successfully"})
	} catch (error) {
		next(error)
	}
})



const validateUserExists = (result) => {
  if (result.length == 0) {
    return;
  }
  if (result[0].is_verified)
    throw new Error(`${result[0].email} already exists`);
  else throw new Error(`${result[0].email} needs to be verified`);
};

module.exports = signup_router;
