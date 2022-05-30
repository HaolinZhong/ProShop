import React from 'react';
import "./bootstrap.min.css";
import Header from './components/Header';
import Footer from './components/Footer';
import Homescreen from './homescreen/Homescreen';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <main className='py-3'>
            <Routes><Route path='/' element={<Homescreen />} exact/></Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
