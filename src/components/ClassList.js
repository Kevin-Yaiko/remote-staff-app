import { useCallback, useEffect, useMemo, useState } from "react"
import { MaterialReactTable, useMaterialReactTable } from "material-react-table"

export const ClassList = () => {
  const [classes, setClasses] = useState([])
  const [url, setUrl] = useState("http://localhost:8000/classes")

  const fetchClasses = useCallback(async() => {
    const response = await fetch(url)
    const data = await response.json()
    setClasses(data)
  }, [url])

  useEffect(() => {
    fetchClasses()
  }, [fetchClasses])


  const columns = useMemo(
    () => [
    {
      header: 'Class',
      accessorKey: 'name',
    },
    {
      header: 'ID',
      accessorKey: 'id',
    }
    ],
    [],
  )

  const table = useMaterialReactTable({
    data: classes,
    columns,
  })

  return (
    // <section>
    //   <button onClick={() => setUrl("http://localhost:8000/classes")}>All</button>
    //   <button onClick={() => setUrl("http://localhost:8000/classes?lessons=16")}>16 lessons</button>
    //   {classes.map((classItem, index) => (
    //     <p key={index}>{classItem.name} ({classItem.id})</p>
    //   ))}
    // </section>
    <section>
      <MaterialReactTable table={table} />
    </section>
  )
}
