import React, { useContext, useState } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext';

/**
 * Renders a food item component with image, name, price, description, and cart functionality.
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.image - The image filename of the food item.
 * @param {string} props.name - The name of the food item.
 * @param {number} props.price - The price of the food item.
 * @param {string} props.desc - The description of the food item.
 * @param {string|number} props.id - The unique identifier for the food item.
 * @returns {JSX.Element} A food item card with image, details, and add/remove functionality.
 */
const FoodItem = ({ image, name, price, desc , id }) => {

    const [itemCount, setItemCount] = useState(0);
    const {cartItems,addToCart,removeFromCart,url,currency} = useContext(StoreContext);

    return (
        <div className='food-item'>
            <div className='food-item-img-container'>
                <img className='food-item-image' src={url+"/images/"+image} alt="" />
                {!cartItems[id]
                /**
                 * Renders an add icon image that adds an item to the cart when clicked
                 ```
                 /**
                  * Renders an image element with a remove icon and attaches a click event handler to remove an item from the cart
                  * @param {string} assets.remove_icon_red - The source URL for the remove icon image
                  * @param {function} removeFromCart - The function to call when the icon is clicked
                  * @param {string|number} id - The identifier of the item to be removed from the cart
                  * @returns {JSX.Element} An img element representing the remove icon with attached click functionality
                  */
                 ```
                 * @param {string} id - The unique identifier of the item to be added to the cart
                 * @param {Object} assets - An object containing image assets, including the add icon
                 * @returns {JSX.Element} An img element representing the add icon
                 */
                ?<img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="" />
                :<div className="food-item-counter">
                        <img src={assets.remove_icon_red} onClick={()=>removeFromCart(id)} alt="" />
                        <p>{cartItems[id]}</p>
                        ```
                        /**
                         * Renders an image element for adding an item to the cart
                         * @param {string} assets.add_icon_green - The source URL for the green add icon image
                         * @param {function} addToCart - The function to call when the image is clicked
                         * @param {string|number} id - The identifier of the item to be added to the cart
                         * @returns {JSX.Element} An img element with onClick functionality to add an item to the cart
                         */
                        ```
                        <img src={assets.add_icon_green} onClick={()=>addToCart(id)} alt="" />
                    </div>
                }
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p> <img src={assets.rating_starts} alt="" />
                </div>
                <p className="food-item-desc">{desc}</p>
                <p className="food-item-price">{currency}{price}</p>
            </div>
        </div>
    )
}

export default FoodItem
