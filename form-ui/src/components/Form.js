import React from "react"
import axios from "axios"
import { pullData } from "../db-calls/access-endpoint"
import { DataContext } from "./context/DBContext"

// MUI Installs
import { FormControl, TextField, Button } from "@mui/material"
import { createTheme } from "@mui/material"
import Box from "@mui/material/Box"

const styles = createTheme({
  Box: {
    width: "50px",
    height: "50px",
    backgroundColor: "#283044",
    position: "relative",
    top: "-35px",
    left: "50%",
    border: "10px solid #bfa89e",
    transform: "rotate(45deg)",
    backgroundClip: "padding-box",
  },
  TextField: {
    color: "#ebf5ee",
    margin: "auto",
    width: "80%",
    backgroundColor: "#283044",
    "& label": {
      color: "white",
    },
    "& input": {
      color: "white",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#ebf5ee",
    },
  },
  FormControl: {
    padding: "10px",
    margin: "auto",
    backgroundColor: "#bfa89e",
    paddingBottom: "50px",
  },
  Button: {
    margin: "auto",
    backgroundColor: "#283044",
    padding: "10px",
    position: "relative",
    left: "90%",
    top: "-90px",
    border: "3px solid #D707F4",
  },
})

export default function Form(props) {
  const [data, setData] = React.useContext(DataContext)

  const [firstName, setFirstName] = React.useState("")
  const [lastName, setLastName] = React.useState("")
  const [userEmail, setUserEmail] = React.useState("")

  const updateFirstName = (e) => {
    setFirstName(e)
  }

  const updateLastName = (e) => {
    setLastName(e)
  }

  const updateUserEmail = (e) => {
    setUserEmail(e)
  }

  const submitData = () => {
    const data = {
      first_name: firstName,
      second_name: lastName,
      email: userEmail,
    }

    axios
      .post("http://localhost:3000/users", JSON.stringify(data), {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
      .then(function (response) {
        setFirstName("")
        setLastName("")
        setUserEmail("")
        setData(pullData())
      })
      .catch(function (error) {
        console.log("expo replied with error: ", error)
      })

    setData((data) => pullData())
  }
  return (
    <>
      <FormControl sx={styles.FormControl} fullWidth variant="standard">
        <TextField
          sx={styles.TextField}
          label="First Name"
          variant="filled"
          value={firstName}
          onChange={(e) => updateFirstName(e.target.value)}
        />
        <br />
        <TextField
          sx={styles.TextField}
          label="Last Name"
          variant="filled"
          value={lastName}
          onChange={(e) => updateLastName(e.target.value)}
        />
        <br />
        <TextField
          sx={styles.TextField}
          label="Email"
          variant="filled"
          value={userEmail}
          onChange={(e) => updateUserEmail(e.target.value)}
        />
      </FormControl>
      <Box sx={styles.Box} />
      <Button
        variant="contained"
        sx={styles.Button}
        size="large"
        onClick={() => submitData()}
      >
        Submit
      </Button>
    </>
  )
}
