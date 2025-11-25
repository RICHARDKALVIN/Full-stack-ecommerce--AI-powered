
import { OrderHeader } from "./OrderHeader.jsx";
import { OrderDetailGrid } from "./OrderDetailGrid.jsx";
export function OrderGrid({currOrder,loadCart}){
    return (
        <div className="orders-grid">
                {
                  currOrder.map((order)=>{
                    return (
                      <div key={order.id} className="order-container">
        
                     <OrderHeader order={order} />
                      <OrderDetailGrid order={order} loadCart={loadCart}/>
                </div>
        
                    );
                  })
                }
                
              </div>
    );
}