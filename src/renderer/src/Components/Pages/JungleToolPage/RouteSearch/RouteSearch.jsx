import { useState, useEffect, useContext, useRef } from 'react'
import './routesearch.css'
import { CampSelectionContext } from '../../../../Contexts/CampSelectionContext'
import { championIds } from '../../../../Data/Objects'
import { patchInfo } from '../../../../Data/PatchInfo'

/**
 * Defines a route search component.
 * @param {StyleSheet} inputStyle - The style for the input field
 * @returns {HTMLElement} - Returns a route search component.
 */
const RouteSearch = ({inputStyle, optionsStyle, deleteAreaStyle, deleteButtonStyle, confirmDeletionStyle, createButtonStyle}) => {

	const [namingRoute, setNamingRoute] = useState(false)
	const [matches, setMatches] = useState([])
	const {routeName, createImport, deleteOnClick, allRoutes, getRoutes, setAllRoutes} = useContext(CampSelectionContext)
	const [displayConfirmation, setDisplayConfirmation] = useState(false)
	const confirmRef = useRef(null)

	useEffect(() => {
		/**
		 * Handles a click outside of the confirmation dialog box.
		 * @param {MouseEvent} event - The click event.
		 */
		const handleClickOutside = (event) => {
			if (confirmRef.current && !confirmRef.current.contains(event.target)) {
				setDisplayConfirmation(false)
			}
		}
	
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [confirmRef])

	/**
	 * Spawns a div for the user to enter the new route name on click.
	 */
	const addOnClick = () => {
		setNamingRoute(true)
	}

	useEffect(() => {
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
			champions: null,
			patch: patchInfo.currentPatch,
			gameData: {
				totalWr: '-%',
				totalGames: 0,
				totalWins: 0,
				totalLosses: 0,
				// Champion specific entries
				vsChampion: Object.entries(championIds).map(([key, value]) => ({
					[key]: {
						name: value.name,
						totalWr: '-%',
						totalGames: 0,
						totalWins: 0,
						totalLosses: 0
					}
				}))
			}
		}
		const error = document.getElementById('routenameerror')
		const data = await window.api.readRoutesFile()
		if (!data.routes.find(route => route.name === routeObject.name)) {
			error.style.display = 'none'
			data.routes.push(routeObject)
			window.api.writeRoutesFile(data)
			setAllRoutes(data.routes)
			createImport(JSON.stringify(routeObject))
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
		createImport(JSON.stringify(routeObject))
	}

	return ( 
		<div className="routesearch">
			<div className="routenameanddelete"	
				ref={confirmRef} 
				style={deleteAreaStyle ? deleteAreaStyle : {}}
			>		
				<p className="nameOfCurrentlySelected" data-testid={'currentlySelected' + routeName} style={{ color: 'white'}}>{routeName}
				</p>
				{routeName && <button className='deleteRoute' onClick={() => setDisplayConfirmation(true)} 
					style={deleteButtonStyle ? deleteButtonStyle : {}}>DELETE</button>
				}
				{displayConfirmation &&	
					<div className="confirmDeletion"
						style={confirmDeletionStyle ? confirmDeletionStyle : {}}
					>
						<p className="confirmP">Are you sure you want to delete this route?</p>
						<div className="buttoncontainer">					
							<button className="confirmbutton" id='yesdelete' onClick={() => {
								setDisplayConfirmation(false)
								deleteOnClick(setAllRoutes)
							}}>Yes</button>
							<button className="confirmbutton" id='nodelete' onClick={() => setDisplayConfirmation(false)}>No</button></div>
					</div>
				}
			</div>
			<input type="text" placeholder='Search for your route' className='routesearchinput' 
				onChange={handleInput} onFocus={handleInput} onBlur={handleBlur} 
				data-testid="routesearchinput"   
				style={inputStyle ? inputStyle : {}}/>
			<button className='addRoute' 
				onClick={addOnClick} 
				data-testid="addRouteButton"
				style={createButtonStyle ? createButtonStyle : {}}
			>+</button>
			{ //matches.length > 0 &&
				<div className="routeoptions"
					style={optionsStyle ? optionsStyle : {}}
				>
					<ul className="routeul">
						{
							matches.map((route, index) => (
								<li className="routeli" key={route.name + index} data-testid={route.name} data-value={route.name} onClick={() => liClick(matches[index]) }>
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
					<input type="text" name="" id="routename" className="namerouteinput" placeholder='Name your route' required data-testid="nameRouteInput"/>
					<p className="errormessage" id="routenameerror">A route with that name already exists</p>
					<button className='create' onClick={createOnClick} data-testid="createButton">Create</button>
					<button className="cancel" onClick={() => setNamingRoute(false)}>X</button>
				</div>
			</div>}
		</div>
	)
}
 
export default RouteSearch