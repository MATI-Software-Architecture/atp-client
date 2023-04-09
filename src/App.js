import './App.css';
import Index from './pages/index';
import { Product, Products, New } from './pages/products';
import Navigation from './components/navigation';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DB from './db';

const db = new DB();

async function ping() {
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  let i = 0;
  while(true) {
    await sleep(5000);
    i++;
    console.log(`index ${i} Pinging...`);
    fetch('http://localhost:8080/health/status', {method: "GET", mode: 'no-cors', headers: {'Content-Type': 'text/plain'}})
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(err => console.error(err));
  }
};

ping();

function App() {
  return (
      <BrowserRouter>
        <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element = 
            {<Index/>} 
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
        </div>
      </BrowserRouter>
  );
};

export default App;
