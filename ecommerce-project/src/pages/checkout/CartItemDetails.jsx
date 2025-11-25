import axios from 'axios';
import { useState } from 'react';
export function CartItemDetail({ cartItem,loadCart }) {
    const deleteCartItem = async () =>{
        await axios.delete(`api/cart-items/${cartItem.productId}`);
        await loadCart();
    
    }
    const [isUpdate,setUpdate] =useState(false);
    const [quantity,setQuantity] =useState(cartItem.quantity);
   
    const updateQuantityItem =(event)=>{
        setQuantity(event.target.value);
    }
    const keyHandler =(event)=>{
        if(event.key == 'Enter'){
            addToCartBtn();

        }
        if(event.key == 'Escape'){
            setQuantity(cartItem.quantity);
            setUpdate(false);
        }

    }
    const addToCartBtn = async ()=>{
        if(isUpdate){
            
                await axios.put(`api/cart-items/${cartItem.productId}`,{
                    quantity:Number(quantity)
                });
                await loadCart();
                setUpdate(false);
        }else{
            setUpdate(true);
        }

    }

    return (
        <>
            <img className="product-image"
                src={cartItem.product.image} />

            <div className="cart-item-details">
                <div className="product-name">
                    {cartItem.product.name}
                </div>
                <div className="product-price">
                    ₹{((cartItem.product.priceCents * 87) / 100).toFixed(2)}
                </div>
                <div className="product-quantity">
                    <span>
                        Quantity: {
                            isUpdate ? <input type="text" style={{width : "50px"}} onChange={updateQuantityItem} onKeyDown={keyHandler}/> 
                            : <span className="quantity-label">{cartItem.quantity}</span>
                        }
                    </span>
                    <span className="update-quantity-link link-primary"
                    onClick={addToCartBtn}>
                        Update
                    </span>
                    <span className="delete-quantity-link link-primary"
                    onClick={deleteCartItem}>
                        Delete
                    </span>
                </div>
            </div>
        </>
    );
}