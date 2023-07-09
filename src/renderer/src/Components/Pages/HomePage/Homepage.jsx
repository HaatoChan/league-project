import './homepage.css'
import Title from '../../Title/Title'
import { useState } from 'react'

/**
 * Defines a home page element.
 * @returns {HTMLElement} - Returns the homepage element.
 */
const HomePage = () => {

	const [textState, setTextState] = useState()

	window.LCUApi.lcuConnected((_event, value) => {
		console.log(value)
		setTextState(value)
	})

	return ( 
		<div className="homepagecontainer">
			<div className="titleholder">			
				<Title titleText='Pashas League App'/>
				{<button className="test"style={{width: '50px', height: '50px', position: 'absolute', zIndex: '100000'}} onClick={async () => window.LCUApi.setRoute() }></button> }
			</div>
			<div className="about">
				<h1 id="abouth1">About</h1>
				<p id="firstp" className='aboutP'>Welcome to ChampCalc, the ultimate tool for League of Legends junglers! ChampCalc is designed to help you take your gameplay to the next level. With its intuitive and user-friendly interface, ChampCalc provides you with easy access to jungle-specific tools and simulation tools that will help you plan your early routes and calculate champion stat values based on item builds and levels.</p>
				<p className='aboutP'>Say goodbye to cumbersome in-game experimentation and confusing spreadsheets. With ChampCalc, you can quickly and efficiently plan your jungle routes, compare different itemization options, and stay up-to-date with the latest monthly patches and changes to the game.</p>
				<p className='aboutP'>ChampCalc integrates with Riot Games API to provide you with accurate and up-to-date information on champions, items, and game state. You can also rest assured that ChampCalc is compliant with Riot Games&apos; policies and API usage guidelines.</p>
				<p className='aboutP'>ChampCalc is designed for League of Legends players who are serious about taking their gameplay to the next level. Whether you are a seasoned veteran or just starting out, ChampCalc has everything you need to become a champion jungler. So why wait? Get started with ChampCalc today and take the first step towards dominating the jungle!</p>
			</div>
			<div className="toollinks">
				<p className="">TODO MAKE JGL TOOL IMAGE</p>
				<img src="" alt="" className="jgltool" /> 
				<img src="" alt="" className="simtool" />
			</div>
			<div className="empty">
				{textState}
			</div>
		</div>
	)
}
 
export default HomePage