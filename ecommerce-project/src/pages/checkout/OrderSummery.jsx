import { DeliveryOptions } from './DeliveryOptions';
import { CartItemDetail } from './CartItemDetails';
import { DeliveryDate } from './DeliveryDate';
export function OrderSummary({ cart, deliveryOptions,loadCart }) {
  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        cart.map((cartItem) => {

          const selectedDeliverOption = deliveryOptions.find((option) => {
            return option.id === cartItem.deliveryOptionId;
          });

          return (
            <div key={cartItem.productId} className="cart-item-container">
              <DeliveryDate selectedDeliverOption={selectedDeliverOption}/>

              <div className="cart-item-details-grid">
                <CartItemDetail cartItem={cartItem} loadCart={loadCart}/>
                <DeliveryOptions deliveryOptions={deliveryOptions} cartItem={cartItem} loadCart={loadCart} />





              </div>
            </div>

          );

        })
      }




    </div>

  );
}