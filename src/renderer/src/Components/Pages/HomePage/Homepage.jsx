import './homepage.css'
import Title from '../../Title/Title'
import { useState } from 'react'

/**
 * Defines a home page element.
 * @returns {HTMLElement} - Returns the homepage element.
 */
const HomePage = () => {

	const [failedFetch, setFailedFetch] = useState(false)
	window.api.failedFetch(() => {
		setFailedFetch(true)
		window.api.clearMainInterval()
	})

	return ( 
		<div className="homepagecontainer">
			<div className="titleholder">			
				<Title titleText='PAL'/>
			</div>
			<div className="about">
				<h1 id="abouth1">About</h1>
				<p id="firstp" className='aboutP'>Welcome to PAL: Plan and Analyze your Jungle Routes in League of Legends!</p>
				<p className='aboutP'>Are you ready to take your jungling skills to the next level? Look no further! PAL is your ultimate companion in the Summoner&apos;s Rift, designed exclusively for League of Legends junglers like you. Our app is here to streamline your jungle routes, optimize your pathing, and elevate your winrate to new heights!</p>
				<p className='aboutP'>PAL integrates with Riot Games API to provide you with accurate and up-to-date information on champions, items, and game state.</p>
				<p className='aboutP'>PAL is designed for League of Legends players who are serious about taking their gameplay to the next level. Whether you are a seasoned veteran or just starting out, PAL has everything you need to become a champion jungler. So why wait? Get started with PAL today and take the first step towards dominating the jungle!</p>
				<small className='api-note'>PAL is an independent third-party app and is not endorsed or affiliated with Riot Games, Inc. League of Legends is a registered trademark of Riot Games, Inc.</small>
			</div>
			<div className="toollinks">
				<img src="" alt="" className="jgltool" /> 
				<img src="" alt="" className="simtool" />
			</div>
			<div className="empty">
			</div>
			{ failedFetch &&
				<div className="failedfetch">
					<button className="closefetch" onClick={() => setFailedFetch(false)}>X</button>
					<p className="failerror">
					Something went wrong getting data from Riot CDN. <br></br> Certain functions may not work as expected. <br></br> To reattempt press the retry button in the sidebar.
					</p>
				</div>
			}
		</div>
	)
}
 
export default HomePage