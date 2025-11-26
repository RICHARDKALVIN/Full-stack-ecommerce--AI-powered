import axios from 'axios';
import {money} from '../../utils/money';
import { useNavigate } from 'react-router';
export function PaymentSummery({paymentsummery ,loadCart}){
  const navigate =useNavigate();
  const createOrder = async ()=>{
    const API = import.meta.env.VITE_API_URL;
    await axios.post(`${API}/api/orders`);
    await loadCart();
    navigate('/orders');
  }
    return (
        <div className="payment-summary">
            <div className="payment-summary-title">
              Payment Summary
            </div>

            {paymentsummery &&(
              <>
              <div className="payment-summary-row">
              <div>Items ({paymentsummery.totalItems}):</div>
              <div className="payment-summary-money">${money(paymentsummery.productCostCents)}</div>
            </div>

            <div className="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div className="payment-summary-money">₹{money(paymentsummery.shippingCostCents)}</div>
            </div>

            <div className="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div className="payment-summary-money">₹{money(paymentsummery.totalCostBeforeTaxCents)}</div>
            </div>

            <div className="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div className="payment-summary-money">₹{money(paymentsummery.taxCents)}</div>
            </div>

            <div className="payment-summary-row total-row">
              <div>Order total:</div>
              <div className="payment-summary-money">${paymentsummery.taxCents}</div>
            </div>

            <button className="place-order-button button-primary"
            onClick={createOrder}>
              Place your order
            </button>
            </>
            
          )

          }

            
        </div>

    );
}