import { HeaderComponent } from '../../components/HeaderComponent';
import axios from 'axios'
import { OrderSummary } from './OrderSummery';
import { PaymentSummery } from './PaymentSummary';
import { useState,useEffect } from 'react';
import './Checkout-header.css';
import './Checkout-page.css';
export function CheckoutPage({cart,loadCart}){
  const API = import.meta.env.VITE_API_URL;
  const [paymentsummery ,setPaymentSummery] =useState(null);

  const [deliveryOptions,setDeliveryOptions] =useState([]);
  useEffect(()=>{
    axios.get(`${API}/api/delivery-options?expand=estimatedDeliveryTime`)
    .then((respone)=>{
      setDeliveryOptions(respone.data);
    });

    
  },[]);

  useEffect(()=>{
    axios.get(`${API}/api/payment-summary`)
    .then((respone)=>{
      setPaymentSummery(respone.data);
      
    });

  },[cart]);
 

return (
<>
   <title>checkout</title>
     <HeaderComponent cart={cart}/>

    <div className="checkout-page">
      <div className="page-title">Review your order</div>

      <div className="checkout-grid">
        <OrderSummary cart={cart} deliveryOptions={deliveryOptions} loadCart={loadCart}/>
         < PaymentSummery  paymentsummery={paymentsummery} loadCart={loadCart} />
        
      </div>
    </div>
</>
);
}