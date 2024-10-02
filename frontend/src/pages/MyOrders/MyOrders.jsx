import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import axios from 'axios'
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/assets';

/**
 * Renders a component displaying the user's orders
 * @returns {JSX.Element} A JSX element containing the user's orders
 */
const MyOrders = () => {
  
  const [data,setData] =  useState([]);
  const {url,token,currency} = useContext(StoreContext);

  /**
   * Fetches user orders asynchronously from the server
   * @param {void} - This function doesn't take any parameters
   * @returns {Promise<void>} A promise that resolves when the orders are fetched and set in the state
   */
  const fetchOrders = async () => {
    const response = await axios.post(url+"/api/order/userorders",{},{headers:{token}});
    setData(response.data.data)
  }

  /**
   * Fetches orders when a token is available
   * @param {string} token - Authentication token
   * @returns {void} No return value
   */
  /**
   * Renders a paragraph containing a list of order items with their quantities.
   * @param {Object} order - The order object containing an array of items.
   * @param {Array} order.items - An array of item objects in the order.
   * @param {string} order.items[].name - The name of each item.
   * @param {number} order.items[].quantity - The quantity of each item.
   * @returns {JSX.Element} A paragraph element with a comma-separated list of items and their quantities, without a comma after the last item.
   */
  useEffect(()=>{
    if (token) {
      fetchOrders();
    }
  },[token])
/**
 * Renders a list of order items
 * @param {Array} data - An array of order objects
 * @returns {JSX.Element[]} An array of JSX elements representing each order
 */

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order,index)=>{
          return (
            <div key={index} className='my-orders-order'>
                <img src={assets.parcel_icon} alt="" />
                <p>{order.items.map((item,index)=>{
                  if (index === order.items.length-1) {
                    return item.name+" x "+item.quantity
                  }
                  else{
                    return item.name+" x "+item.quantity+", "
                  }
                  
                })}</p>
                <p>{currency}{order.amount}.00</p>
                <p>Items: {order.items.length}</p>
                <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                <button onClick={fetchOrders}>Track Order</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyOrders
