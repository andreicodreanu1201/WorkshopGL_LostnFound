// src/ItemCard.jsx
import "./App.css"
// sau
import "./ItemCard.css"

export const ItemCard = ({ name, image, location, reward, posted, status }) => {
  return (
    <div className="olx-card">
      <div className="olx-image-wrapper">
        <img src={image} alt={name} />
        <span className="olx-badge">{status}</span>
      </div>

      <div className="olx-content">
        <h3 className="olx-title">{name}</h3>

        <div className="olx-location">📍 {location}</div>
        <div className="olx-date">⏱️ {posted}</div>

        <div className="olx-reward">
          Recompensă: <strong>{reward} lei</strong>
        </div>
      </div>
    </div>
  )
}
