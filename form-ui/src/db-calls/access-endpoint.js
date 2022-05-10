import axios from "axios"

/**
 * Pulls Data from database, returns promise that resolves to an array
 *
 * @returns {Promise}
 */
const pullData = async () => {
  let data
  console.log("pulling")
  await axios.get("http://localhost:3000/users").then((res) => {
    console.log(res.data)
    data = res.data
  })
  return data
}

export { pullData }
