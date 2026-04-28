import { useState } from "react"
import { HomePage } from "./HomePage"
import { AnimalDetails } from "./AnimalDetails"
import { AddAnimal } from "./AddAnimal"

function App() {
  const [selectedAnimal, setSelectedAnimal] = useState(null)
  const [adding, setAdding] = useState(false)
  const [animals, setAnimals] = useState([])

  const handleAdd = (animal) => {
    const newAnimal = {
      ...animal,
      id: Date.now(),
      posted: "Acum",
    }
    setAnimals(prev => [...prev, newAnimal])
    setAdding(false)
  }

  return (
    <>
      {adding ? (
        <AddAnimal onAdd={handleAdd} onBack={() => setAdding(false)} />
      ) : selectedAnimal ? (
        <AnimalDetails animal={selectedAnimal} onBack={() => setSelectedAnimal(null)} />
      ) : (
        <HomePage
          onSelectAnimal={setSelectedAnimal}
          onAddClick={() => setAdding(true)}
          extraAnimals={animals}
        />
      )}
    </>
  )
}

export default App
