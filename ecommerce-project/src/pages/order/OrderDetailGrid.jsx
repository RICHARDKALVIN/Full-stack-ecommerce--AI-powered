import { Fragment } from "react";
import axios from 'axios';
import dayjs from "dayjs";
export function OrderDetailGrid({order,loadCart}){
  const API = import.meta.env.VITE_API_URL;
     const addToCart = async (productId)=>{
            await axios.post(`${API}/api/cart-items`,{
              productId : productId,
              quantity : 1
            });
            loadCart();
          }
    return (
        
                  <div className="order-details-grid">
        
                    {order.products.map((orderProduct)=>{
                      return(
                        <Fragment key={orderProduct.product.id}>
                    <div className="product-image-container">
                      <img src={orderProduct.product.image} />
                    </div>
        
                    <div className="product-details">
                      <div className="product-name">
                        {orderProduct.product.name}
                      </div>
                      <div className="product-delivery-date">
                        Arriving on: {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D')}
                      </div>
                      <div className="product-quantity">
                        Quantity: {orderProduct.quantity}
                      </div>
                      <button className="buy-again-button button-primary"
                       onClick={()=>addToCart(orderProduct.product.id)}>
                        <img className="buy-again-icon" src="images/icons/buy-again.png" />
                        <span className="buy-again-message">Add to Cart</span>
                      </button>
                    </div>
        
                    <div className="product-actions">
                      <a href={`/tracking/${order.id}/${orderProduct.productId}`}>
                        <button className="track-package-button button-secondary">
                          Track package
                        </button>
                      </a>
                    </div>
                    </Fragment>
                      );
                    })}
        
                 
                  </div>
    );
}