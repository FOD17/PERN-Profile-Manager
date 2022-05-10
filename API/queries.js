// Connect to pstgresql
const Pool = require("pg").Pool
const pool = new Pool({
  user: "root",
  host: "localhost",
  database: "demo",
  password: "root",
  port: 5432,
})

const getUsers = (request, response) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { first_name, second_name, email } = request.body

  pool.query(
    "INSERT INTO users (first_name, second_name, email) VALUES ($1, $2, $3)",
    [first_name, second_name, email],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.id}`)
    }
  )
}

const updateUser = (request, response) => {
  // const id = parseInt(request.params.id)
  const { first_name, second_name, email, id } = request.body

  pool.query(
    "UPDATE users SET first_name = $1, second_name = $2, email = $3 WHERE id = $4",
    [first_name, second_name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}
