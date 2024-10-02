import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'

/**
 * Renders the Home component, which displays the main page of the application
 * @param {void} - This component doesn't accept any parameters
 * @returns {JSX.Element} A React component that renders the home page, including Header, ExploreMenu, FoodDisplay, and AppDownload components
 */
const Home = () => {

  const [category,setCategory] = useState("All")

  return (
    <>
      <Header/>
      <ExploreMenu setCategory={setCategory} category={category}/>
      <FoodDisplay category={category}/>
      <AppDownload/>
    </>
  )
}

export default Home
