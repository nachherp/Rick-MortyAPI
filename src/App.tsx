import React, { useEffect, useState, Suspense } from "react";
import "./App.css"; 

const App = () => {
  const [items, setItems] = useState([]); 
  const [selectedItem, setSelectedItem] = useState(null); 
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null); 
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://rickandmortyapi.com/api/character");
        if (!response.ok) {
          throw new Error("Error al cargar los datos de la API");
        }
        const data = await response.json();
        setItems(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    const savedItem = JSON.parse(localStorage.getItem("selectedItem") || "null");
    if (savedItem) setSelectedItem(savedItem);

    fetchData();
  }, []);

  // Manejar selección
  const handleSelect = (item) => {
    setSelectedItem(item);
    localStorage.setItem("selectedItem", JSON.stringify(item));
  };

  if (isLoading) {
    return <div className="loading">Cargando...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="app">
      <h1>Rick & Morty Characters</h1>
      {selectedItem && (
        <div className="selected-item">
          <h2>{selectedItem.name}</h2>
          <img src={selectedItem.image} alt={selectedItem.name} />
          <p>Status: {selectedItem.status}</p>
        </div>
      )}
      <div className="items-grid">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => handleSelect(item)} // Hacer clic en este elemento
            className="item-card"
          >
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.species}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const AppWrapper = () => {
  return (
    <Suspense fallback={<div className="loading">Cargando la aplicación...</div>}>
      <App />
    </Suspense>
  );
};

export default AppWrapper;

