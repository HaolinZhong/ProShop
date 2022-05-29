import React from 'react';
import "./bootstrap.min.css";
import Header from './components/Header';
import Footer from './components/Footer';
import Homescreen from './homescreen/Homescreen';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <Header />
      <main className='py-3'>
          <Homescreen />
      </main>
      <Footer />
    </div>
  );
}

export default App;
