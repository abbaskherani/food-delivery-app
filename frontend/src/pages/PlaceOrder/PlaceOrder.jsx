import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext'
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

/**
 * Renders a form component for placing an order, handling user input, payment selection, and order submission.
 * @returns {JSX.Element} A form element containing delivery information inputs, cart total, payment method selection, and a submit button.
 */
const PlaceOrder = () => {

    const [payment, setPayment] = useState("cod")
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    })

    const { getTotalCartAmount, token, food_list, cartItems, url, setCartItems,currency,deliveryCharge } = useContext(StoreContext);

    const navigate = useNavigate();

    ```
    /**
     * Handles changes in form inputs by updating the data state.
     /**
      * Updates the data state by setting a new value for a specific property
      * @param {Function} data - The current data state
      * @param {string} name - The name of the property to update
      * @param {any} value - The new value to set for the specified property
      * @returns {Object} A new object with the updated property
      */
     * @param {Object} event - The event object from the input change.
     * @param {string} event.target.name - The name of the input field.
     * @param {string} event.target.value - The new value of the input field.
     * @returns {void} This function doesn't return a value, it updates state internally.
     */
    ```
    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({ ...data, [name]: value }))
    }

    /**
     * Places an order based on the items in the cart and payment method
     * @param {Event} e - The event object from the form submission
     /**
      * Filters and transforms a list of food items based on cart quantities
      * @param {Array} food_list - The list of food items to process
      * @param {Object} cartItems - An object containing item quantities keyed by item ID
      * @returns {Array} orderItems - A new array containing food items with quantities greater than 0
      */
     * @returns {Promise<void>} Doesn't return a value, but performs side effects:
     *                          - For Stripe payments: Redirects to Stripe checkout
     *                          - For COD: Navigates to order page and updates cart
     */
    const placeOrder = async (e) => {
        e.preventDefault()
        let orderItems = [];
        food_list.map(((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo)
            }
        }))
        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + deliveryCharge,
        }
        if (payment === "stripe") {
            let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
            if (response.data.success) {
                const { session_url } = response.data;
                window.location.replace(session_url);
            }
            else {
                toast.error("Something Went Wrong")
            }
        }
        else{
            /**
             * A React effect hook that handles user authentication and cart validation for order placement
             * @param {function} useEffect - React's useEffect hook
             * @param {string|null} token - User authentication token
             * @param {function} toast - Toast notification function
             * @param {function} navigate - Navigation function from react-router
             * @param {function} getTotalCartAmount - Function to calculate total cart amount
             * @returns {void} No return value
             */
            let response = await axios.post(url + "/api/order/placecod", orderData, { headers: { token } });
            if (response.data.success) {
                navigate("/myorders")
                toast.success(response.data.message)
                setCartItems({});
            }
            else {
                toast.error("Something Went Wrong")
            }
        }

    }

    useEffect(() => {
        if (!token) {
            toast.error("to place an order sign in first")
            navigate('/cart')
        }
        else if (getTotalCartAmount() === 0) {
            navigate('/cart')
        }
    }, [token])

    return (
        <form onSubmit={placeOrder} className='place-order'>
            <div className="place-order-left">
                <p className='title'>Delivery Information</p>
                <div className="multi-field">
                    <input type="text" name='firstName' onChange={onChangeHandler} value={data.firstName} placeholder='First name' required />
                    <input type="text" name='lastName' onChange={onChangeHandler} value={data.lastName} placeholder='Last name' required />
                </div>
                <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Email address' required />
                <input type="text" name='street' onChange={onChangeHandler} value={data.street} placeholder='Street' required />
                <div className="multi-field">
                    <input type="text" name='city' onChange={onChangeHandler} value={data.city} placeholder='City' required />
                    <input type="text" name='state' onChange={onChangeHandler} value={data.state} placeholder='State' required />
                </div>
                <div className="multi-field">
                    <input type="text" name='zipcode' onChange={onChangeHandler} value={data.zipcode} placeholder='Zip code' required />
                    <input type="text" name='country' onChange={onChangeHandler} value={data.country} placeholder='Country' required />
                </div>
                <input type="text" name='phone' onChange={onChangeHandler} value={data.phone} placeholder='Phone' required />
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details"><p>Subtotal</p><p>{currency}{getTotalCartAmount()}</p></div>
                        <hr />
                        <div className="cart-total-details"><p>Delivery Fee</p><p>{currency}{getTotalCartAmount() === 0 ? 0 : deliveryCharge}</p></div>
                        <hr />
                        <div className="cart-total-details"><b>Total</b><b>{currency}{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + deliveryCharge}</b></div>
                    </div>
                </div>
                <div className="payment">
                    <h2>Payment Method</h2>
                    /**
                     * Renders a clickable div element for selecting Cash on Delivery (COD) payment option
                     * @param {Function} setPayment - Function to update the payment state with "cod"
                     * @returns {JSX.Element} A div element with onClick event handler for COD payment selection
                     /**
                      * Renders a clickable div element that sets the payment method to "stripe"
                      * @param {function} setPayment - Function to update the payment method state
                      * @returns {JSX.Element} A div element with onClick event to select Stripe as the payment option
                      */
                     */
                    <div onClick={() => setPayment("cod")} className="payment-option">
                        <img src={payment === "cod" ? assets.checked : assets.un_checked} alt="" />
                        <p>COD ( Cash on delivery )</p>
                    </div>
                    <div onClick={() => setPayment("stripe")} className="payment-option">
                        <img src={payment === "stripe" ? assets.checked : assets.un_checked} alt="" />
                        <p>Stripe ( Credit / Debit )</p>
                    </div>
                </div>
                <button className='place-order-submit' type='submit'>{payment==="cod"?"Place Order":"Proceed To Payment"}</button>
            </div>
        </form>
    )
}

export default PlaceOrder
