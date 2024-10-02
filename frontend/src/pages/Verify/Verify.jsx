import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext';
import './Verify.css'

/**
 * Verify component for handling payment verification process
 * @returns {JSX.Element} A div containing a spinner while verification is in progress
 */
const Verify = () => {
  const { url } = useContext(StoreContext)
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success")
  /**
   * Verifies a payment by making an API call and navigates based on the response
   * @param {void} - This function doesn't take any parameters
   * @returns {Promise<void>} Doesn't return a value, but performs navigation based on the API response
   */
  const orderId = searchParams.get("orderId")

  const navigate = useNavigate();

  const verifyPayment = async () => {
    const response = await axios.post(url + "/api/order/verify", { success, orderId });
    if (response.data.success) {
      navigate("/myorders");
    }
    else {
      navigate("/")
    }
  }

  /**
   * Verifies the payment when the component mounts
   * @returns {void} No return value
   */
  useEffect(() => {
    verifyPayment();
  }, [])

  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  )
}

export default Verify
