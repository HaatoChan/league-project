import './footer.css'

/**
 * Defines a footer element.
 * @returns {HTMLElement} - Returns a div representing a footer.
 */
const Footer = () => {
	return ( 
		<div className="footer">
			{/* eslint-disable-next-line react/no-unescaped-entities */}
			<p className='footerText'>[Your product] isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.</p>
		</div>
	)
}
 
export default Footer