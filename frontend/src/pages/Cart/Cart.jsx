import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom';

/**
 * Renders the Cart component, displaying the user's shopping cart items and totals
 * @returns {JSX.Element} The rendered Cart component
 */
const Cart = () => {

  const {cartItems, food_list, removeFromCart,getTotalCartAmount,url,currency,deliveryCharge} = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          /**
           * Renders a list of food items in the shopping cart
           * @param {Array} food_list - An array of food items to be displayed
           * @param {Object} cartItems - An object containing the quantities of each item in the cart
           * @param {string} url - The base URL for food item images
           * @param {string} currency - The currency symbol to be displayed
           * @param {function} removeFromCart - A function to remove an item from the cart
           * @returns {JSX.Element} A JSX element representing the list of cart items
           */
          <p>Items</p> <p>Title</p> <p>Price</p> <p>Quantity</p> <p>Total</p> <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id]>0) {
            return (<div key={index}>
              <div className="cart-items-title cart-items-item">
                <img src={url+"/images/"+item.image} alt="" />
                /**
                 * Renders a remove icon for a cart item
                 * @param {function} removeFromCart - Function to remove an item from the cart
                 * @param {string} item._id - The unique identifier of the cart item
                 * @returns {JSX.Element} A paragraph element with a click event to remove the item
                 */
                <p>{item.name}</p>
                <p>{currency}{item.price}</p>
                <div>{cartItems[item._id]}</div>
                <p>{currency}{item.price*cartItems[item._id]}</p>
                <p className='cart-items-remove-icon' onClick={()=>removeFromCart(item._id)}>x</p>
              </div>
              <hr />
            </div>)
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details"><p>Subtotal</p><p>{currency}{getTotalCartAmount()}</p></div>
            <hr />
            /**
             * Renders a button that navigates to the order page when clicked
             * @param {function} navigate - The navigation function from React Router
             * @returns {JSX.Element} A button element with an onClick event handler
             */
            <div className="cart-total-details"><p>Delivery Fee</p><p>{currency}{getTotalCartAmount()===0?0:deliveryCharge}</p></div>
            <hr />
            <div className="cart-total-details"><b>Total</b><b>{currency}{getTotalCartAmount()===0?0:getTotalCartAmount()+deliveryCharge}</b></div>
          </div>
          <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className='cart-promocode-input'>
              <input type="text" placeholder='promo code'/>
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
