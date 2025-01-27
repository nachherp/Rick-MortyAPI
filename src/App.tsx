import React, { useEffect, useState } from "react";
import "./App.css"; // Importa los estilos

const App = () => {
  const [items, setItems] = useState([]); // Datos obtenidos de la API
  const [selectedItem, setSelectedItem] = useState(null); // Elemento seleccionado

  // Llamada a la API y carga de datos guardados en `localStorage`
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://rickandmortyapi.com/api/character");
      const data = await response.json();
      setItems(data.results);
    };

    const savedItem = JSON.parse(localStorage.getItem("selectedItem") || "null");
    if (savedItem) setSelectedItem(savedItem);

    fetchData();
  }, []);

  // Manejar selección
  const handleSelect = (item: any) => {
    setSelectedItem(item);
    localStorage.setItem("selectedItem", JSON.stringify(item));
  };

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
        {items.map((item: any) => (
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

export default App;
