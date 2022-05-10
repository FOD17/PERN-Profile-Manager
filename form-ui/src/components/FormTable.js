import React from "react"
import axios from "axios"
import UpdateDialog from "./UpdateDialog"
import { pullData } from "../db-calls/access-endpoint"
import { DataContext } from "./context/DBContext"

// MUI Installs
import Table from "@mui/material/Table"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import TableBody from "@mui/material/TableBody"
import Paper from "@mui/material/Paper"
import Button from "@mui/material/Button"
import { createTheme } from "@mui/material"

const styles = createTheme({
  TableCell: {
    fontSize: "25px",
    margin: "auto",
  },
  TableContainer: {
    maxWidth: "90%",
    margin: "auto",
    backgroundColor: "#f5f5f5",
  },
  TableHead: {
    "& th": {
      backgroundColor: "#bfa89e",
      color: "#ebf5ee",
    },
  },
  TableData: {
    "&:nth-of-type(even)": {
      backgroundColor: "rgb(190, 183, 191 ,0.4)",
    },
  },
})

export default function FormTable() {
  const [data, setData] = React.useContext(DataContext)

  const [isOpen, setIsOpen] = React.useState(false)
  const [rowData, setRowData] = React.useState({})

  const [firstName, setFirstName] = React.useState()
  const [lastName, setLastName] = React.useState()
  const [userEmail, setUserEmail] = React.useState()

  React.useEffect(() => {
    console.log("runs")
    axios.get("http://localhost:3000/users").then((res) => {
      setData(res.data)
    })
  }, [data.length, isOpen])

  const deleteRow = (id) => {
    setData([])
    axios.delete(`http://localhost:3000/users/${id}`).then((res) => {
      console.log(res.data)
      console.log("results", pullData())
      setData(pullData())
    })
  }

  const openDialogue = (rowData) => {
    setRowData(rowData)
    setIsOpen(true)
  }

  return (
    <>
      <UpdateDialog open={isOpen} setOpen={setIsOpen} rowData={rowData} />
      <TableContainer sx={styles.TableContainer} component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={styles.TableHead}>
            <TableRow>
              <TableCell sx={styles.TableCell}>id</TableCell>
              <TableCell sx={styles.TableCell} align="right">
                First Name
              </TableCell>
              <TableCell sx={styles.TableCell} align="right">
                Last Name
              </TableCell>
              <TableCell sx={styles.TableCell} align="right">
                Email
              </TableCell>
              <TableCell sx={styles.TableCell}>Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 &&
              data.map((data) => (
                <TableRow key={data.id} sx={styles.TableData}>
                  <TableCell sx={styles.TableCell} component="th" scope="row">
                    {data.id}
                  </TableCell>
                  <TableCell sx={styles.TableCell} align="right">
                    {data.first_name}
                  </TableCell>
                  <TableCell sx={styles.TableCell} align="right">
                    {data.second_name}
                  </TableCell>
                  <TableCell sx={styles.TableCell} align="right">
                    {data.email}
                  </TableCell>
                  <TableCell sx={styles.TableCell}>
                    <Button onClick={() => deleteRow(data.id)}>Delete</Button>
                    <Button onClick={() => openDialogue(data)}>Update</Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
