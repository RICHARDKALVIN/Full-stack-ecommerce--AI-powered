import { Routes,Route } from 'react-router'
import { useEffect,useState } from 'react'
import axios from 'axios'
import {HomePage} from './pages/home/HomePage'
import { CheckoutPage } from './pages/checkout/CheckoutPage'
import {OrderPage} from './pages/order/OrderPage'
import { TrackingPage } from './pages/tracking/TrackingPage'
import './App.css'


function App() {
  const API = import.meta.env.VITE_API_URL;
  console.log(API);
 const [cart ,setCart]=useState([]);
  const loadCart = async ()=> {
  const cart= await axios.get(`${API}/api/cart-items?expand=product`);
  setCart(cart.data);

  }

 useEffect(()=>{

 
  loadCart();
   

 },[]);

  return (
    <>
    <Routes>
      <Route index element={ <HomePage cart={cart} loadCart={loadCart}/>}/>
      <Route path='/checkout' element={<CheckoutPage cart={cart} loadCart={loadCart} />} />
      <Route path='/orders' element={<OrderPage cart={cart} loadCart={loadCart} />} ></Route>
      <Route path='/tracking/:orderId/:productId' element={<TrackingPage cart={cart}/>} />

    </Routes>
   
    </>
  )
}

export default App
