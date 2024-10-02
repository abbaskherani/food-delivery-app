import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'

```
/**
 * Renders a component for promoting app download with links to app stores
 * @returns {JSX.Element} A div containing app download information and store icons
 */

```const AppDownload = () => {
    return (
        <div className='app-download' id='app-download'>
            <p>For Better Experience Download <br />Tomato App</p>
            <div className="app-download-platforms">
                <img src={assets.play_store} alt="" />
                <img src={assets.app_store} alt="" />
            </div>
        </div>
    )
}

export default AppDownload
