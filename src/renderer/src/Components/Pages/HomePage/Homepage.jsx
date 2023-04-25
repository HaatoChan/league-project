import './homepage.css'
import Title from '../../Title/Title'

/**
 * Defines a home page element.
 * @returns {HTMLElement} - Returns the homepage element.
 */
const HomePage = () => {
	return ( 
		<div className="homepagecontainer">
			<div className="titleholder">			
				<Title titleText='Pashas League App'/>
			</div>
			<div className="about">
                
			</div>
			<div className="toollinks">
				<img src="" alt="" className="jgltool" />
				<img src="" alt="" className="simtool" />
			</div>
			<div className="empty"></div>
		</div>
	)
}
 
export default HomePage