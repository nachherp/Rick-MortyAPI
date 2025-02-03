import React, { useState, Suspense } from "react";
import useSWR from "swr";
import "./App.css"; 

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const App: React.FC = () => {
  const { data, error } = useSWR("https://rickandmortyapi.com/api/character", fetcher);
  const [selectedItem, setSelectedItem] = useState(() => {
    return JSON.parse(localStorage.getItem("selectedItem") || "null");
  });

  if (error) return <div className="error">Error: {error.message}</div>;
  if (!data) return <div className="loading">Cargando...</div>;

  const items = data.results;

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
            onClick={() => handleSelect(item)}
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

const AppWrapper: React.FC = () => {
  return (
    <Suspense fallback={<div className="loading">Cargando la aplicación...</div>}>
      <App />
    </Suspense>
  );
};

export default AppWrapper;
