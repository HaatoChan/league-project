import { useContext, useEffect, useState } from 'react'
import './routesearch.css'
import { SideBarContext } from '../../../../Contexts/SideBarContext'

/**
 * Defines a route search component.
 * @returns {HTMLElement} - Returns a route search component.
 */
const RouteSearch = () => {

	const [namingRoute, setNamingRoute] = useState(false)
	const [allRoutes, setAllRoutes] = useState([])
	const {currentlySelected, setCurrentlySelected} = useContext(SideBarContext)
	const [matches, setMatches] = useState([])
	/**
	 * Spawns a div for the user to enter the new route name on click.
	 */
	const addOnClick = () => {
		setNamingRoute(true)
	}

	useEffect(() => {
		/**
		 * Gets the current routes.
		 */
		const getRoutes = async () => {
			const data = await window.api.readRoutesFile()
			setAllRoutes(data.routes)
		}
		getRoutes()
	},[])

	/**
	 * Creates a new route when button is pressed.
	 */
	const createOnClick = async () => {
		const input = document.getElementById('routename')
		const nameOfRoute = input.value
		const routeObject = {
			name: nameOfRoute,
			side: 'All',
			route: null,
			champions: null
		}
		const error = document.getElementById('routenameerror')
		const data = await window.api.readRoutesFile()
		if (!data.routes.find(route => route.name === routeObject.name)) {
			error.style.display = 'none'
			data.routes.push(routeObject)
			window.api.writeRoutesFile(data)
			setAllRoutes(data.routes)
			setCurrentlySelected(routeObject)
			setNamingRoute(false)
		} else {
			error.style.display = 'Inline'
		}
	}

	/**
	 * Searches for a match matching the input.
	 * @param {Event} event - The event that triggers the function.
	 */
	const handleInput = (event) => {
		const input = event.target.value
		const inputToLower = input.toLowerCase()
		const matches = allRoutes.filter(index => {
			return index.name.toLowerCase().includes(inputToLower)
		})
		setMatches(matches)
	}

	/**
	 * Resets the shown champions.
	 */
	const handleBlur = () => {
		setTimeout(() => {
			setMatches([])
		}, 200) 
	}

	/**
	 * Receives the matching route object when the corresponding li is pressed.
	 * @param {object} routeObject - The matching route object.
	 */
	const liClick = (routeObject) => {
		setCurrentlySelected(routeObject)
	}

	return ( 
		<div className="routesearch">
			<p className="nameOfCurrentlySelected" style={{ color: 'white'}}>{currentlySelected?.name}</p>
			<input type="text" placeholder='Search for your route' className='routesearchinput' onChange={handleInput} onFocus={handleInput} onBlur={handleBlur}/>
			<button className='addRoute' onClick={addOnClick}>+</button>
			{ matches.length > 0 &&
				<div className="routeoptions">
					<ul className="routeul">
						{
							matches.map((route, index) => (
								<li className="routeli" key={route.name + index} data-value={route.name} onClick={() => liClick(matches[index]) }>
									<div className="routelitext" data-value={route.name}>{route.name}</div>
								</li>
							))
						}
					</ul>
				</div>
			}
			{namingRoute && <div className='nameRoute' onClick={() => setNamingRoute(false)}>
				<div className="namingSpace" onClick={(e) => e.stopPropagation()}>
					<p className="popupP">Name your route</p>
					<input type="text" name="" id="routename" className="namerouteinput" placeholder='Name your route' required/>
					<p className="errormessage" id="routenameerror">A route with that name already exists</p>
					<button className='create' onClick={createOnClick}>Create</button>
					<button className="cancel" onClick={() => setNamingRoute(false)}>X</button>
				</div>
			</div>}
		</div>
	)
}
 
export default RouteSearch