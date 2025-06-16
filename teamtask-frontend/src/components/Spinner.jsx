import "./Spinner.css"

function Spinner() {
  return (
    <div className="spinner-container">
      <div className="spinner">
        <div className="spinner-circle"></div>
        <div className="spinner-circle"></div>
        <div className="spinner-circle"></div>
      </div>
      <p>Chargement...</p>
    </div>
  )
}

export default Spinner
