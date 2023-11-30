import { useCallback, useEffect, useState } from "react"

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

  return (
    <section>
      <button onClick={() => setUrl("http://localhost:8000/classes")}>All</button>
      <button onClick={() => setUrl("http://localhost:8000/classes?lessons=16")}>16 lessons</button>
      {classes.map((classItem, index) => (
        <p key={index}>{classItem.name} ({classItem.id})</p>
      ))}
    </section>
  )
}
