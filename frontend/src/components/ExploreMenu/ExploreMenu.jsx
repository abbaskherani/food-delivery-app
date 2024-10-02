import React, { useContext } from 'react'
import './ExploreMenu.css'
import { StoreContext } from '../../Context/StoreContext'

/**
 * Renders the Explore Menu component that displays a list of menu categories.
 * @param {Object} props - The component props.
 * @param {string} props.category - The currently selected menu category.
 * @param {Function} props.setCategory - Function to update the selected category.
 * @returns {JSX.Element} A div containing the Explore Menu section with a title, description, and clickable menu categories.
 */
const ExploreMenu = ({category,setCategory}) => {

  const {menu_list} = useContext(StoreContext);
  
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our menu</h1>
      <p className='explore-menu-text'>Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
      <div className="explore-menu-list">
        /**
         * Renders a list of menu items with clickable images and names
         /**
          * Renders a clickable div element that toggles the category state between the item's menu name and "All"
          * @param {Function} setCategory - State setter function to update the category
          * @param {Object} item - Object containing menu information
          * @param {string} item.menu_name - The name of the menu item
          * @param {number} index - The index of the current item in the list
          * @returns {JSX.Element} A div element with onClick event and className
          */
         * @param {Array} menu_list - An array of menu items, each containing menu_name and menu_image properties
         * @param {string} category - The currently selected category
         * @param {function} setCategory - A function to update the selected category
         * @returns {Array} An array of JSX elements representing menu items
         */
        {menu_list.map((item,index)=>{
            return (
                /**
                 * Renders a clickable div element that toggles the category state
                 * @param {Function} onClick - Event handler that updates the category state
                 * @param {number} key - Unique identifier for the list item
                 * @param {string} className - CSS class name for styling the div
                 * @returns {JSX.Element} A div element representing a menu item in the explore section
                 */
                <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className='explore-menu-list-item'>
                    <img src={item.menu_image} className={category===item.menu_name?"active":""} alt="" />
                    <p>{item.menu_name}</p>
                </div>
            )
        })}
      </div>
      <hr />
    </div>
  )
}

export default ExploreMenu
