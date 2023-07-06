import './electronsidebar.css'
import SideBarButton from '../SideBarButton/SideBarButton'
import settings from '../../assets/settings-gear-icon.svg'
import Home from '../../assets/home-icon.svg'
import JungleIcon from '../../assets/garden-grass-solid-icon.svg'
import LeagueIcon from '../../assets/LoL_icon.svg.png'
import { useState } from 'react'

/**
 * Defines a sidebar for the electron app.
 * @returns {HTMLElement} - Returns a sidebar.
 */
const ElectronSideBar = () => {

	window.LCUApi.lobbyEntered(async () => {
		setInLobby(true)
	})

	window.LCUApi.lobbyExited(async () => {
		setInLobby(false)
	})

	window.LCUApi.gameEnded(async (_event, data) => {
		console.log('sidebar:' + data)
	})

	const [inLobby, setInLobby] = useState(false)

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
			{ !inLobby && <SideBarButton imgSource={LeagueIcon} style={{ filter: 'none'}} text='Lobby' linkHref='lobby-screen'/> }
			<SideBarButton text='Home' imgSource={Home} linkHref='/' />
			<SideBarButton text='Jungle Tool' imgSource={JungleIcon} linkHref='jungletool' id='jungleA'/>
			<SideBarButton text='Settings' imgSource={settings} linkHref='settings' id="settingsA"/>
		</div>
	)
}
 
export default ElectronSideBar