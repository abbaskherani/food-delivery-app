import React from 'react'
import './Header.css'

/**
 * Renders the header component of the food ordering application
 * @returns {JSX.Element} A div containing the header content, including a title, description, and a button to view the menu
 */
const Header = () => {
    return (
        <div className='header'>
            <div className='header-contents'>
                <h2>Order your favourite food here</h2>
                <p>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
                <button>View Menu</button>
            </div>
        </div>
    )
}

export default Header
