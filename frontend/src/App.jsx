import React from 'react';
import "./bootstrap.min.css";
import Header from './components/Header';
import Footer from './components/Footer';
import Homescreen from './screens/Homescreen';
import Productscreen from './screens/Productscreen';
import Cartscreen from './screens/Cartscreen';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Loginscreen from './screens/LoginScreen';
import Registerscreen from './screens/Registerscreen';
import Profilescreen from './screens/Profilescreen';
import Shippingscreen from './screens/Shippingscreen';
import Paymentscreen from './screens/Paymentscreen';
import Placeorderscreen from './screens/Placeorderscreen';
import Orderscreen from './screens/Orderscreen';
import Userlistscreen from './screens/Userlistscreen';
import UserEditscreen from './screens/UserEditscreen';
import Productlistscreen from './screens/ProductListscreen';
import ProductEditscreen from './screens/ProductEditscreen';
import OrderListscreen from './screens/OrderListscreen';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <main className='py-3'>
          <Routes>
            <Route path='/login' element={<Loginscreen />} />
            <Route path='/register' element={<Registerscreen />} />
            <Route path='/profile' element={<Profilescreen />} />
            <Route path='/' element={<Homescreen />} exact />
            <Route path='/shipping' element={<Shippingscreen />} />
            <Route path='/payment' element={<Paymentscreen />} />
            <Route path='/placeorder' element={<Placeorderscreen />} />
            <Route path='/orders/:id' element={<Orderscreen />} />
            <Route path='/products/:id' element={<Productscreen />} />
            <Route path='/cart/:id' element={<Cartscreen />} />
            <Route path='/cart' element={<Cartscreen />} />
            <Route path='/admin/userlist' element={<Userlistscreen />} />
            <Route path='/admin/user/:id/edit' element={<UserEditscreen/>} />
            <Route path='/admin/productlist' element={<Productlistscreen />} exact/>
            <Route path='/admin/productlist/:pageNumber' element={<Productlistscreen exact/>} />
            <Route path='/admin/product/:id/edit' element={<ProductEditscreen/>} />
            <Route path='/admin/orderlist' element={<OrderListscreen />} />
            <Route path='/search/:keyword' element={<Homescreen />}  exact/>
            <Route path='/page/:pageNumber' element={<Homescreen />} exact/>
            <Route path='/search/:keyword/page/:pageNumber' element={<Homescreen />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
