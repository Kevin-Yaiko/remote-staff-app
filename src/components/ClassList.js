import { useCallback, useEffect, useMemo, useState } from "react"
import { MaterialReactTable, useMaterialReactTable } from "material-react-table"
import { Field, Form, Formik } from "formik"

export const ClassList = () => {
  const [classes, setClasses] = useState([])
  const [url, setUrl] = useState("http://localhost:8000/classes")
  const [ranks, setRanks] = useState([])

  // For testing Formik
  const initialValues = {}


  const fetchClasses = useCallback(async() => {
    const response = await fetch(url)
    const data = await response.json()
    setClasses(data)
  }, [url])

  useEffect(() => {
    fetchClasses()
  }, [fetchClasses])


  const handleRankChange = (e) => {
    const rowData = {"id": e.target.id, "rank": e.target.value}
    setRanks((prevRanks) => {
      const nonSelectedClasses = prevRanks.filter((classes) => classes.id !== rowData.id)
      if (rowData.rank === "") {
        return [...nonSelectedClasses]
    } else {
      return [...nonSelectedClasses, rowData]
    }
  })
  }


  useEffect(() => {
    console.log(ranks)
  }, [ranks])


  const columns = useMemo(
    () => [
    {
      header: 'Rank',
      size: 40,
      // Cell: ({ row }) => (
      //   <input 
      //   type="number" 
      //   min="1" 
      //   max="10" 
      //   step="1" 
      //   id={row.original.id}
      //   value={ranks.rank}
      //   onChange={handleRankChange}/>
      // )
      Cell: ( {row}) => (
        <Formik initialValues={initialValues}>
          <Form>
            <Field type="number" name="rank" />
          </Form>
        </Formik>
      )
    },
    {
      header: 'Class',
      accessorKey: 'name',
      size: 40,
      Cell: ({ row }) => (
        <div>
          <p>{row.original.name} ({row.original.id})</p>
        </div>
      )
    },
    {
      header: 'Day',
      accessorKey: 'days',
      // Cell: ({ row }) => (
      //   <div>
      //     {row.original.days.map((day, idx) => {
      //       if (row.original.days.length > 1 && row.original.days.length - idx > 1) {
      //         return <span key={idx}>{day}, </span>
      //       } else
      //       return <span key={idx}>{day}</span>}
      //     )}
      //   </div>
      // ),
      filterVariant: 'multi-select',
    },
    {
      header: "Start",
      accessorKey: "start",
    },
    {
      header: "End",
      accessorKey: "end"
    },
    {
      header: "Time",
      accessorKey: "start-time",
      filterVariant: 'multi-select',
    }
    ],
    [],
  )

  const table = useMaterialReactTable({
    data: classes,
    columns,
    enableFacetedValues: true,
  })

  // useEffect(() => {
  //   setTableKey(Math.random())
  // }, [table.getRowModel().rows.length])

  useEffect(() => {
    console.log('columns changed')
  }, [table])


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
