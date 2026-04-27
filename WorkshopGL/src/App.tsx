import { Toaster } from 'react-hot-toast'; // Importă asta!

function App() {
  return (
    <>
      {/* Această linie face ca mesajele să apară în colțul ecranului */}
      <Toaster position="top-center" reverseOrder={false} />
      
      <div>
        {/* Aici ai restul codului tău existent */}
        <h1>Proiectul meu</h1>
      </div>
    </>
  );
}

export default App;