import { useEffect, useState } from "react"

export const ClassList = () => {
  const [classes, setClasses] = useState([])

  useEffect(() => {
    fetch("http://localhost:8000/classes")
    .then(response => response.json())
    .then(data => setClasses(data))
  }, [])

  return (
    <section>
      {classes.map((classItem, index) => (
        <p key={index}>{classItem.id}</p>
      ))}
    </section>
  )
}
