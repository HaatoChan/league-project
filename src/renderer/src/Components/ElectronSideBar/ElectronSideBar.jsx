import './electronsidebar.css'
import SideBarButton from '../SideBarButton/SideBarButton'
import settings from '../../assets/settings-gear-icon.svg'
import Home from '../../assets/home-icon.svg'

/**
 * Defines a sidebar for the electron app.
 * @returns {HTMLElement} - Returns a sidebar.
 */
const ElectronSideBar = () => {
    
	/**
	 * Fired when user mouses over the sidebar.
	 */
	const mouseEnter = () => {
		const sidebar = document.getElementById('elesidebar')
		sidebar.style.width = '13%'
	}

	/**
	 * Fired when user leaves the sidebar.
	 */
	const mouseLeave = () => {
		const sidebar = document.getElementById('elesidebar')
		sidebar.style.width = '4%'
	}

	return ( 
		<div className="elesidebar" onMouseEnter={mouseEnter} id='elesidebar' onMouseLeave={mouseLeave}>
			<SideBarButton text='Home' imgSource={Home} linkHref='/'></SideBarButton>
			<SideBarButton text='Settings' imgSource={settings} linkHref='settings'></SideBarButton>
		</div>
	)
}
 
export default ElectronSideBar