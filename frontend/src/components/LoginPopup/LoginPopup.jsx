import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'

/**
 * LoginPopup component for user authentication
 * @param {Object} props - Component props
 * @param {Function} props.setShowLogin - Function to control the visibility of the login popup
 * @returns {JSX.Element} A form for user login or sign up
 */
const LoginPopup = ({ setShowLogin }) => {

    const { setToken, url,loadCartData } = useContext(StoreContext)
    const [currState, setCurrState] = useState("Sign Up");

    const [data, setData] = useState({
        name: "tester",
        email: "testingpurpose1@gmail.com",
        ```
        /**
         * Updates a specific property in the data state object
         * @param {Function} setData - React state setter function for updating data
         * @param {string} name - The key of the property to be updated
         * @param {any} value - The new value to be set for the specified property
         * @returns {void} This function doesn't return a value, it updates state
         */
        ```
        password: "testingmyapp@123"
    })

    ```
    /**
     * Handles user login or registration based on the current state.
     * @param {Event} e - The event object from the form submission.
     * @returns {Promise<void>} Doesn't return a value, but performs side effects:
     *                          - Sets the authentication token if login/registration is successful.
     *                          - Stores the token in local storage.
     *                          - Loads cart data with the new token.
     *                          - Hides the login form.
     *                          - Displays an error toast if login/registration fails.
     */
    ```
    /**
     * Handles input change events and updates the data state.
     * @param {Event} event - The DOM event object from the input change.
     * @returns {void} This function doesn't return a value.
     */
    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({ ...data, [name]: value }))
    }

    const onLogin = async (e) => {
        e.preventDefault()

        let new_url = url;
        if (currState === "Login") {
            new_url += "/api/user/login";
        }
        else {
            new_url += "/api/user/register"
        }
        const response = await axios.post(new_url, data);
        if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem("token", response.data.token)
            loadCartData({token:response.data.token})
            setShowLogin(false)
        }
        else {
            toast.error(response.data.message)
        }
    }

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    /**
                     * Renders a header with the current state and a close button
                     * @param {string} currState - The current state to be displayed as a heading
                     * @param {function} setShowLogin - Function to update the login visibility state
                     * @param {object} assets - Object containing image assets
                     * @returns {JSX.Element} A header element with state display and close button
                     */
                    <h2>{currState}</h2> <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Sign Up" ? <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required /> : <></>}
                    <input name='email' onChange={onChangeHandler} value='testingpurpose1@gmail.com' type="email" placeholder='Your email' />
                    <input name='password' onChange={onChangeHandler} value='testingmyapp@123' type="password" placeholder='Password' required />
                </div>
                <button>{currState === "Login" ? "Login" : "Create account"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" name="" id="" required/>
                    <p>By continuing, i agree to the terms of use & privacy policy.</p>
                </div>
                {currState === "Login"
                    /**
                     * Renders a paragraph with a clickable span to switch to the Sign Up state
                     * @param {function} setCurrState - Function to update the current state
                     * @returns {JSX.Element} A paragraph element with a clickable span
                     */
                    ? <p>Create a new account? <span onClick={() => setCurrState('Sign Up')}>Click here</span></p>
                    /**
                     * Renders a paragraph with a link to switch to the login state
                     * @param {function} setCurrState - Function to update the current state
                     * @returns {JSX.Element} A paragraph element with a clickable span
                     */
                    : <p>Already have an account? <span onClick={() => setCurrState('Login')}>Login here</span></p>
                }
            </form>
        </div>
    )
}

export default LoginPopup
