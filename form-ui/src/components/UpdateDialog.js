import React from "react"
import axios from "axios"

// Material UI
import {
  Button,
  TextField,
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material"

export default function UpdateDialog(props) {
  const { open, setOpen, rowData } = props
  const [updatedFirstName, setUpdatedFirstName] = React.useState(
    rowData.first_name
  )
  const [updatedLastName, setUpdatedLastName] = React.useState(
    rowData.second_name
  )
  const [updatedUserEmail, setUpdatedUserEmail] = React.useState(rowData.email)

  const handleUpdate = () => {
    axios
      .put(`http://localhost:3000/users/${rowData.id}`, {
        first_name: updatedFirstName,
        second_name: updatedLastName,
        email: updatedUserEmail,
        id: rowData.id,
      })
      .then((res) => {
        console.log(res.data)
        handleClose(false)
      })
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => handleClose()}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Update Information For User</DialogTitle>
        <DialogContent>
          <TextField
            disabled={true}
            value={rowData.id}
            sx={{ marginBottom: "10px" }}
          />
          <br />
          <TextField
            InputLabelProps={{
              shrink: true,
              form: {
                autocomplete: "off",
              },
            }}
            type={"text"}
            label="First Name"
            variant="standard"
            fullWidth
            onChange={(e) => setUpdatedFirstName(e.target.value)}
          />
          <br />
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            label="Last Name"
            variant="standard"
            placeholder={rowData.second_name}
            onChange={(e) => setUpdatedLastName(e.target.value)}
          />
          <br />
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            label="Email"
            variant="standard"
            placeholder={rowData.email}
            onChange={(e) => setUpdatedUserEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()}>Cancel</Button>
          <Button onClick={() => handleUpdate()}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
