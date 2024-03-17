const express = require('express')
const bodyParser = require('body-parser')
const root_router = require('./routes/root_route')
const signup_router = require('./routes/signup_route')
const { connect_db, pool } = require('./db_connect')
const { auth_handler } = require('./middleware/auth_middleware')
const user_router = require('./routes/user_route')
const avatar_router = require('./routes/avatar_route')
const task_router = require('./routes/task_route')

const cors = require('cors')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
)


const main_router = express.Router()

main_router.use(root_router)
main_router.use(signup_router)
main_router.use("/avatars",avatar_router)
main_router.use("/task", auth_handler, task_router)
main_router.use("/user", auth_handler,user_router)

app.use('/api/v1', main_router)
app.use(express.static(__dirname + "/static"))

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({"message":err.message})
})

const PORT = 5000 || process.env.PORT



app.listen(PORT, async () => {
    await connect_db()
    console.log("server up on port:"+PORT)
})