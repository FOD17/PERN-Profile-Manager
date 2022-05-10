const express = require("express")
var cors = require("cors")
const bodyParser = require("body-parser")
const app = express()
const port = 3000

app.use(cors())

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

const db = require("./queries")
app.get("/users", db.getUsers)
app.get("/users/:id", db.getUserById)
app.post("/users", db.createUser)
app.put("/users/:id", db.updateUser)
app.delete("/users/:id", db.deleteUser)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" })
})
