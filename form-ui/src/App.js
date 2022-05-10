import React from "react"

// My Components
import FormTable from "./components/FormTable"
import Form from "./components/Form"
import DataContext from "./components/context/DBContext"

function App() {
  return (
    <>
      <DataContext>
        <Form />
        <FormTable />
      </DataContext>
    </>
  )
}

export default App
