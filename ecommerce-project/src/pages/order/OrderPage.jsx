import './OrderPage.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {HeaderComponent} from '../../components/HeaderComponent'
import { OrderGrid } from './OrderGrid';
window.axios = axios;
export function OrderPage({cart,loadCart}){
  const [currOrder, setOrder] = useState([]);
  useEffect(()=>{
    const getO =async ()=>{
      const response = await axios.get('/api/orders?expand=products');
       setOrder(response.data);
    };
    getO();
    
  },[]);

    return (
        <>
         <title>Orders </title>
         <HeaderComponent cart ={cart}/>

    <div className="orders-page">
      <div className="page-title">Your Orders</div>

      <OrderGrid currOrder={currOrder} loadCart={loadCart}/>
    </div>
        </>

    );
}