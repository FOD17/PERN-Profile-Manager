import React from "react"

export const DataContext = React.createContext()

export default function DBContext(props) {
  const [data, setData] = React.useState([])

  return (
    <>
      <DataContext.Provider value={[data, setData]}>
        {props.children}
      </DataContext.Provider>
    </>
  )
}
