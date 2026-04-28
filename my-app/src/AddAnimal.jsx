import { useState } from "react"

export const AddAnimal = ({ onAdd, onBack }) => {
  const [form, setForm] = useState({
    name: "",
    location: "",
    reward: "",
    status: "Pierdut",
    image: ""
  })

  const update = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={onBack} style={{ marginBottom: "20px" }}>
        Înapoi
      </button>

      <h1>Adaugă animal</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "300px" }}>
        <input
          name="name"
          placeholder="Nume"
          onChange={update}
          style={{ padding: "8px" }}
        />

        <input
          name="location"
          placeholder="Oraș"
          onChange={update}
          style={{ padding: "8px" }}
        />

        <input
          name="reward"
          placeholder="Recompensă"
          onChange={update}
          style={{ padding: "8px" }}
        />

        <input
          name="image"
          placeholder="URL imagine"
          onChange={update}
          style={{ padding: "8px" }}
        />

        <select
          name="status"
          onChange={update}
          style={{ padding: "8px" }}
        >
          <option>Pierdut</option>
          <option>Găsit</option>
        </select>

        <button
          onClick={() => onAdd(form)}
          style={{
            padding: "10px",
            background: "#002f34",
            color: "white",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Adaugă
        </button>
      </div>
    </div>
  )
}
