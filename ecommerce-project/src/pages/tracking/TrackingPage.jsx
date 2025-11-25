import { useState ,useEffect} from 'react';
import { HeaderComponent } from '../../components/HeaderComponent';
import './TrackingPage.css';
import axios  from 'axios';
import { useParams } from 'react-router';
import dayjs from 'dayjs';

export function TrackingPage({cart}){

  const [currOrder ,setOrder] =useState(null);
   const {orderId,productId} = useParams();
   useEffect(()=>{
    const getO = async ()=>{

    const response = await axios.get(`/api/orders/${orderId}?expand=products`)
    setOrder(response.data);
    console.log(response.data);
    }
    getO();
    
   },[orderId]);
   
   if(!(currOrder)) {
    return null;
   } ;
    
   
   const  orderProduct = currOrder.products.find((orderpro)=>{
      return productId == orderpro.productId;
   }) ;

   const totalTimeMs=orderProduct.estimatedDeliveryTimeMs - currOrder.orderTimeMs;
   const timePassedMs =dayjs().valueOf() -currOrder.orderTimeMs;
   let progressPercent =(timePassedMs / totalTimeMs) * 100;
   if(progressPercent > 100){
    progressPercent = 100;
   }
   console.log(progressPercent);
   const isPrepared = progressPercent <33;
   const isShipped =progressPercent >=33 && progressPercent < 100;
   const isDeliverd = progressPercent === 100;

   if(!orderProduct){
    console.log("not fetched");
   };


    return (
        <>
        <title>Tracking</title>
          <HeaderComponent cart={cart}/>

    <div className="tracking-page">
      <div className="order-tracking">
        <a className="back-to-orders-link link-primary" href="/orders">
          View all orders
        </a>

        <div className="delivery-date">
          Arriving on {dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
        </div>

        <div className="product-info">
           {orderProduct.product.name}
        </div>

        <div className="product-info">
          {orderProduct.quantity}
        </div>

        <img className="product-image" src={orderProduct.product.image} />

        <div className="progress-labels-container">
          <div className={`progress-label  ${isPrepared && 'current-status' }`}>
            Preparing
          </div>
          <div className={`progress-label  ${isShipped && 'current-status' }`}>
            Shipped
          </div>
          <div className={`progress-label  ${isDeliverd && 'current-status' }`}>
            Delivered
          </div>
        </div>

        <div className="progress-bar-container">
          <div className="progress-bar" style={{width: `${progressPercent }%`}}></div>
        </div>
      </div>
    </div>
        </>

    );
}