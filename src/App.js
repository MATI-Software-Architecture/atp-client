import './App.css';
import React, { useState } from 'react';
import Navigation from './components/navigation';
import { Ping, getStatus, RetrieveData } from './components/ping';
import Index from './pages/index';
import { Product, Products, New } from './pages/products';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DB from './db';

const db = new DB();
export const UserContext = React.createContext();

Ping(db);
RetrieveData(db);

function App() {
  const [status, setStatus] = useState(true);
  getStatus(db).then((data) => { setStatus(data) });
  return (
      <BrowserRouter>
        <div className="App">
          <UserContext.Provider value={{ status: status, setStatus: setStatus }}>
          <Navigation />
          <h2>Server status: {status ? 'Ok!' : 'Not responding'}</h2>
          <Routes>
            <Route path="/" element = 
              {<Index db={db}/>} 
            />
            <Route path="/products" element = 
              {<Products db={db}/>} 
            />
            <Route path="/products/:id" element = 
              {<Product db={db}/>}
            />
            <Route path="/products/new" element =
              {<New db={db} />}
            />
          </Routes>
          </UserContext.Provider>
        </div>
      </BrowserRouter>
  );
};

export default App;
