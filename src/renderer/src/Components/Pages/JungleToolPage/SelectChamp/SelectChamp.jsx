import './selectchamp.css'
import { useContext } from 'react'
import { useState } from 'react'
import { championNames } from '../../../../Data/Arrays'
import { CampSelectionContext } from '../../../../Contexts/CampSelectionContext'
import { useEffect } from 'react'

/**
 * Defines a champion selector element.
 * @returns {HTMLElement} Returns an element handling champion selection.
 */
const SelectChamp = () => {

	const {selectedChampions, setSelectedChampions} = useContext(CampSelectionContext)
	const [input, setInput] = useState('')
	const [matches, setMatches] = useState([])
	const [newChampions, setNewChampions] = useState([])
	const [selectedChampsToDisplay, setSelectedChampsToDisplay] = useState([])
	useEffect(() => {
		const promises = championNames.map(async (champion) => {
			const image = await champion.image
			return {
				...champion,
				image,
			}
		})
	
		Promise.all(promises).then((updatedChampionNames) => {
			setNewChampions(updatedChampionNames)
		})
	}, [])



	useEffect(() => {
		if (selectedChampions.length > 0) {
			const updatedSelectedChampions = selectedChampions.map((championName) => {
				const champion = newChampions.find((c) => c.name === championName)
				return champion ? champion : championName
			})
			setSelectedChampsToDisplay(updatedSelectedChampions)
		} else {
			setSelectedChampsToDisplay([])
		}
	}, [newChampions, selectedChampions])

	/**
	 * Handles the event, displaying the matching champions.
	 * @param {Event} event - The event that triggers the function.
	 */
	const handleInput = (event) => {
		const input = event.target.value
		const inputToLower = input.toLowerCase()
		// Find matching names that are not already selected
		const matches = newChampions.filter(index => {
			return index.name.toLowerCase().includes(inputToLower) && !selectedChampions.includes(index.name)
		}
		)
		setInput(input)
		setMatches(matches)
	}

  
	/**
	 * Removes the selected champion from the selectedChamps array.
	 * @param {Event} event - The event that triggered the function.
	 */
	const imgClick = (event) => {
		setSelectedChampsToDisplay(selectedChampsToDisplay.filter(index => index.name !== event.target.dataset.champion))
		setSelectedChampions(selectedChampsToDisplay.filter(index => index.name !== event.target.dataset.champion))
	}

	/**
	 * Adds the champion selected to selected champions.
	 * @param {HTMLElement} e - The element that was clicked.
	 */
	const liClick = (e) => {
		const champName = e.dataset.value
		if (!selectedChampions.includes(champName)) {
			setSelectedChampions([...selectedChampions, champName])
		}
		setMatches([])
	}
	

	/**
	 * Resets the shown champions.
	 */
	const handleBlur = () => {
		setTimeout(() => {
			setMatches([])
		}, 200) 
	}

	return ( 
		<div className="champcontainer">
			<div className="champimages">
				{selectedChampsToDisplay.length > 0 && selectedChampsToDisplay.map((champ) => (
					<img src={champ.image} alt="" className="selectedChampImage" key={champ.name} data-testid={champ.name + 'image'} onClick={imgClick} data-champion={champ.name}/>
				))} 
			</div>
			<div className="searchbarcontainer">
				<input type="text" value={input} onChange={handleInput} onFocus={handleInput} onBlur={handleBlur} data-testid='champInput' className='champInput' placeholder='Search for your champion'/>
				<button className="resetchamps" data-testid="champUnselectAll" onClick={() => { 
					setSelectedChampions([]) 
					setSelectedChampsToDisplay([])
				}}>X</button>
				{matches.length > 0 && (
					<div className="options">
						<ul className="optul">
							{matches.map(match => (
								<li key={match.name} data-value={match.name} data-testid={match.name} className='optli' onClick={(e) => { liClick(e.target) }}>
									<img src={match.image} alt={match.name} className="championImg" data-value={match.name}/>
									<div className="optli-text" data-value={match.name}>{match.name}</div>
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</div>
	)
}

 
export default SelectChamp