
import axios from 'axios';
import dayjs from 'dayjs';

export function DeliveryOptions({ deliveryOptions ,cartItem ,loadCart}) {
const API = import.meta.env.VITE_API_URL;
    return (
        <div className="delivery-options">
            <div className="delivery-options-title">
                Choose a delivery option:
            </div>
            {
                deliveryOptions.map((option) => {
                    let priceString = 'FREE Shipping';

                    if (option.priceCents > 0) {
                        priceString = `₹ ${((option.priceCents * 87) / 100).toFixed(2)} - Shipping`;
                    }
                    const updateDeliveryOption = async ()=>{
                        await axios.put(`${API}/api/cart-items/${cartItem.productId}`,{
                         deliveryOptionId : option.id
                        });
                        await loadCart();
                    }
                    return (

                        <div key={option.id} className="delivery-option" onClick={updateDeliveryOption}>
                             
                            <input type="radio" checked={option.id === cartItem.deliveryOptionId}
                                className="delivery-option-input"
                               onChange={()=>{}}
                                name={`delivery-option-${cartItem.productId}`} />
                            <div>
                                <div className="delivery-option-date">
                                    {dayjs(option.estimatedDeliveryTimeMs).format('dddd,MMMM,D')}
                                </div>
                                <div className="delivery-option-price">
                                    {priceString}
                                </div>
                            </div>
                        </div>

                    );

                })
            }


        </div>
    );

}