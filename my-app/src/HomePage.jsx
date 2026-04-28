import { useState } from "react"
import { ItemCard } from "./ItemCard"

const mockAnimals = [
  { id: 1, name: "Husky Siberian pierdut", location: "Cluj-Napoca", reward: 300, posted: "Acum 3 ore", status: "Pierdut", image: "https://via.placeholder.com/400x300" },
  { id: 2, name: "Pomeranian găsit", location: "București", reward: 0, posted: "Ieri", status: "Găsit", image: "https://via.placeholder.com/400x300" },
  { id: 3, name: "Labrador pierdut", location: "Timișoara", reward: 500, posted: "Acum 1 zi", status: "Pierdut", image: "https://via.placeholder.com/400x300" },
  { id: 4, name: "Bichon găsit", location: "Oradea", reward: 150, posted: "Acum 5 ore", status: "Găsit", image: "https://via.placeholder.com/400x300" },
  { id: 5, name: "Ciobănesc German pierdut", location: "Brașov", reward: 400, posted: "Acum 2 zile", status: "Pierdut", image: "https://via.placeholder.com/400x300" },
  { id: 6, name: "Beagle găsit", location: "Iași", reward: 0, posted: "Acum 6 ore", status: "Găsit", image: "https://via.placeholder.com/400x300" }
]

export const HomePage = ({ onSelectAnimal, onAddClick, extraAnimals }) => {
  const allAnimals = [...mockAnimals, ...extraAnimals]

  const [filter, setFilter] = useState("Toate")
  const [city, setCity] = useState("Toate")
  const [search, setSearch] = useState("")

  const cities = ["Toate", ...new Set(allAnimals.map(a => a.location))]

  const filteredAnimals = allAnimals.filter(a => {
    const matchStatus = filter === "Toate" || a.status === filter
    const matchCity = city === "Toate" || a.location === city
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchCity && matchSearch
  })

  return (
    <div style={{ padding: "16px" }}>
      <h1>Animale pierdute și găsite</h1>

      <button
        onClick={onAddClick}
        style={{
          padding: "10px 20px",
          background: "#002f34",
          color: "white",
          borderRadius: "6px",
          marginBottom: "20px",
          cursor: "pointer"
        }}
      >
        + Adaugă anunț
      </button>

      {/* FILTRE */}
      <div className="filter-buttons">
        <button
          className={filter === "Toate" ? "active" : ""}
          onClick={() => setFilter("Toate")}
        >
          Toate
        </button>

        <button
          className={filter === "Pierdut" ? "active" : ""}
          onClick={() => setFilter("Pierdut")}
        >
          Pierdute
        </button>

        <button
          className={filter === "Găsit" ? "active" : ""}
          onClick={() => setFilter("Găsit")}
        >
          Găsite
        </button>
      </div>

      {/* FILTRU ORAȘ */}
      <select value={city} onChange={e => setCity(e.target.value)} style={{ padding: "8px", marginBottom: "20px" }}>
        {cities.map(c => <option key={c}>{c}</option>)}
      </select>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Caută rasă..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ padding: "8px", marginLeft: "10px", width: "200px" }}
      />

      {/* LISTA */}
      <div className="card-container">
        {filteredAnimals.map(animal => (
          <div key={animal.id} onClick={() => onSelectAnimal(animal)}>
            <ItemCard {...animal} />
          </div>
        ))}
      </div>
    </div>
  )
}
