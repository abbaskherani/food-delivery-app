import React, { useContext } from 'react'
import './FoodDisplay.css'
import FoodItem from '../FoodItem/FoodItem'
import { StoreContext } from '../../Context/StoreContext'

/**
 * Renders a display of food items based on the selected category
 * @param {string} category - The selected food category to filter items
 * @returns {JSX.Element} A div containing a list of filtered FoodItem components
 */
const FoodDisplay = ({category}) => {

  const {food_list} = useContext(StoreContext);

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className='food-display-list'>
        /**
         * Renders a list of food items based on the selected category
         * @param {Array} food_list - An array of food objects containing item details
         * @param {string} category - The currently selected food category
         * @returns {Array} An array of FoodItem components matching the selected category
         */
        {food_list.map((item)=>{
          if (category==="All" || category===item.category) {
            return <FoodItem key={item._id} image={item.image} name={item.name} desc={item.description} price={item.price} id={item._id}/>
          }
        })}
      </div>
    </div>
  )
}

export default FoodDisplay
