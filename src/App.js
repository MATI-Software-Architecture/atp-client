import './App.css';
import Index from './pages/index';
import { Product, Products, New } from './pages/products';
import Navigation from './components/navigation';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DB from './db';

const db = new DB();

async function ping() {
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  while(true) {
    await sleep(5000);
    fetch('http://localhost:8080/health/status')
      .then(response => response.text())
      .then(text => {
        console.log('text', text);
        if (text === 'Ok!') {
          return text;
        } else {
          throw new Error('Server is not responding');
        }
      })
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
