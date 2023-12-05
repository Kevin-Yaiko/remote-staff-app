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

  console.log(classes)
  const columns = useMemo(
    () => [
    {
      header: 'Rank',
      size: 40,
      Cell: ({ row }) => (
        <input type="number" min="1" max="10" step="1" />
      )
    },
    {
      header: 'Class',
      accessorKey: 'name',
      Cell: ({ row }) => (
        <div>
          <p>{row.original.name} ({row.original.id})</p>
        </div>
      )
    },
    {
      header: 'Day',
      accessorKey: 'days',
      Cell: ({ row }) => (
        <div>
          {row.original.days.map((day, idx) => (
            <p key={idx}>{day}</p>
          ))}
        </div>
      )
    },
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
