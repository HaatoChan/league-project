import { createContext, useState } from 'react'
import React from 'react'

export const SideBarContext = createContext()

/**
 * A React component that provides context for the sidebar state.
 * @param {React.PropsWithChildren} props - The component props.
 * @returns {JSX.Element} - The JSX element to be rendered.
 */
const SideBarContextProvider = ({children}) => {

	const [importActive, setImportActive] = useState(false)
	const [valuesActive, setValuesActive] = useState(false)
	const [valuesClicked, setValuesClicked] = useState(false)
	const [copiedActive, setCopiedActive] = useState(false)

	/**
	 * Shows the values element when mousing over.
	 */
	const valuesOnEnter = () => {
		setValuesActive(true)
	}

	/**
	 * Hides the values element when leaving mouseover.
	 */
	const valuesOnLeave = () => {
		valuesClicked === false
			? setValuesActive(false)
			: {}
	}

	/**
	 * Shows the values element when clicked, doesn't hide it if mouse leaves element when clicked.
	 */
	const valuesOnClick = () => {
		if(valuesActive && valuesClicked) {
			setValuesClicked(false)
			setValuesActive(false)
		} else if (valuesActive && !valuesClicked) {
			setValuesClicked(true)
			setValuesActive(true)
		}  
		if (!valuesActive) {
			setValuesActive(true)
			setValuesClicked(true)
			setImportActive(false)
		}
	}

	/**
	 * Shows the import field when clicked.
	 */
	const importOnClick = () => {
		setImportActive(true)
	}

	/**
	 * Saves export string to clipboard when clicked.
	 */
	const exportOnClick = async () => {
		let url = window.location.href
		try {
			await navigator.clipboard.writeText(url)
			setCopiedActive(true)
			setTimeout(() => {
				setCopiedActive(false)
			}, 2000)
		} catch (err) {
			console.log('fail')
		}
	}
	
	/**
	 * Saves the current route to JSON file.
	 */
	const saveOnClick = async () => {
		// Might need some verification here?
		const str = window.location.href	
		const parts = str.split('/')
		const sides = parts[3]
		const path = parts[4] || null
		const champs = parts.slice(5).join('/') || null
		const routeToObject = {
			name: 'Just testing',
			side: sides,
			route: path,
			champions: champs
		}
		const data = await window.api.readRoutesFile()
		data.routes.push(routeToObject)
		window.api.writeRoutesFile(data)
	}

	return <SideBarContext.Provider
		value={{
			importActive: importActive,
			valuesActive: valuesActive,
			valuesOnEnter: valuesOnEnter,
			valuesOnLeave: valuesOnLeave,
			valuesOnClick: valuesOnClick,
			importOnClick: importOnClick,
			exportOnClick: exportOnClick,
			copiedActive: copiedActive,
			saveOnClick: saveOnClick
		}}
	>
		{children}
	</SideBarContext.Provider>
}

export default SideBarContextProvider
