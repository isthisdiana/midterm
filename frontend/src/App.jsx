/*import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Hello World!</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
*/

import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/items';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => setItems(response.data))
      .catch((error) => {
        console.error('Error fetching items:', error);
      });
  }, []);

  const addItem = () => {
    if (newItem.trim() === "") return;
    axios
      .post(API_URL, { name: newItem })
      .then((response) => setItems([...items, response.data]))
      .catch((error) => {
        console.error('Error adding item:', error);
      });
    setNewItem("");
  };

  const updateItem = (id, name) => {
    axios
      .put(`${API_URL}/${id}`, { name })
      .then((response) => {
        setItems(items.map(item => item.id === id ? response.data : item)); 
      })
      .catch((error) => {
        console.error('Error updating item:', error);
      });
  };

  const deleteItem = (id) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => {
        setItems(items.filter((item) => item.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting item:', error);
      });
  }



  return (
    <div>
      <h1>React + Express REST API Practice Code</h1>
      <h2> CRUD Operations </h2>
      <h3>Diana F. Kamilan</h3>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="New Item"
      />
      <button onClick={addItem}>Add Item</button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <input
              type="text"
              value={item.name}
              onChange={(e) => updateItem(item.id, e.target.value)}
            />

            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
      </div>
    );
  }

  export default App
       



  
