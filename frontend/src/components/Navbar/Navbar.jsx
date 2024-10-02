import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'


/**
 * Navbar component for the application
 * @param {Object} props - The component props
 * @param {Function} props.setShowLogin - Function to set the login modal visibility
 * @returns {JSX.Element} The rendered Navbar component
 */

const Navbar = ({ setShowLogin }) => {

  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token ,setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  /**
   * Logs out the user by removing the authentication token and redirecting to the home page.
   * @returns {void} This function doesn't return a value.
   */
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate('/')
  }

  /**
   * Renders a navigation link to the home page
   * @param {string} to - The destination URL for the link
   * @param {function} onClick - The function to be called when the link is clicked
   * @param {string} className - The CSS class name for styling the link
   * @returns {JSX.Element} A Link component for the home navigation item
   */
  return (
    /**
     * Renders a navigation link for the menu section
     * @param {function} onClick - Function to set the menu state to "menu"
     * @param {string} className - Dynamic class name based on the current menu state
     * @returns {JSX.Element} An anchor element for the menu navigation
     */
    <div className='navbar'>
      /**
       * Renders a link to the mobile app download section
       * @param {function} onClick - Function to set the menu state to "mob-app"
       * @param {string} className - CSS class name determined by the current menu state
       * @returns {JSX.Element} An anchor element with href, onClick handler, and dynamic class name
       */
      <Link to='/'><img className='logo' src={assets.logo} alt="" /></Link>
      <ul className="navbar-menu">
        <Link to="/" onClick={() => setMenu("home")} className={`${menu === "home" ? "active" : ""}`}>home</Link>
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={`${menu === "menu" ? "active" : ""}`}>menu</a>
        <a href='#app-download' onClick={() => setMenu("mob-app")} className={`${menu === "mob-app" ? "active" : ""}`}>mobile app</a>
        /**
         * Renders a navigation link for the 'Contact Us' section
         * @param {function} onClick - Function to set the menu state to "contact"
         * @param {string} menu - Current active menu state
         * @returns {JSX.Element} An anchor element with dynamic className and onClick handler
         */
        <a href='#footer' onClick={() => setMenu("contact")} className={`${menu === "contact" ? "active" : ""}`}>contact us</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <Link to='/cart' className='navbar-search-icon'>
          <img src={assets.basket_icon} alt="" />
          <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div>
        </Link>
        /**
         * Renders a sign-in button if the user is not authenticated
         * @param {string|null} token - The authentication token
         * @param {function} setShowLogin - Function to set the login modal visibility
         ```
         /**
          * Renders a navigation list item for accessing the user's orders page
          * @param {Function} navigate - Function to navigate to different routes
          * @returns {JSX.Element} A list item component with an icon and text for accessing orders
          */
         ```
         * @returns {JSX.Element|null} A button element if token is falsy, otherwise null
         */
        {!token ? <button onClick={() => setShowLogin(true)}>sign in</button>
          : <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="" />
            <ul className='navbar-profile-dropdown'>
              <li onClick={()=>navigate('/myorders')}> <img src={assets.bag_icon} alt="" /> <p>Orders</p></li>
              <hr />
              <li onClick={logout}> <img src={assets.logout_icon} alt="" /> <p>Logout</p></li> 
            </ul>
          </div>
        }

      </div>
    </div>
  )
}

export default Navbar
