export const AnimalDetails = ({ animal, onBack }) => {
  return (
    <div style={{ padding: "20px" }}>
      <button onClick={onBack}>Înapoi</button>

      <h1>{animal.name}</h1>
      <img src={animal.image} style={{ width: "400px", borderRadius: "12px" }} />

      <p><strong>Locație:</strong> {animal.location}</p>
      <p><strong>Status:</strong> {animal.status}</p>
      <p><strong>Recompensă:</strong> {animal.reward} lei</p>
      <p><strong>Postat:</strong> {animal.posted}</p>
    </div>
  )
}
