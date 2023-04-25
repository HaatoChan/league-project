import './selectchamp.css'
import { useContext } from 'react'
import { useState } from 'react'
import { championNames } from '../../Data/Arrays'
import { CampSelectionContext } from '../../Contexts/CampSelectionContext'

/**
 * Defines a champion selector element.
 * @returns {HTMLElement} Returns an element handling champion selection.
 */
const SelectChamp = () => {

	const {selectedChampions, setSelectedChampions} = useContext(CampSelectionContext)
	const [input, setInput] = useState('')
	const [matches, setMatches] = useState([])
	

	/**
	 * Handles the event, displaying the matching champions.
	 * @param {Event} event - The event that triggers the function.
	 */
	const handleInput = (event) => {
		const input = event.target.value
		const inputToLower = input.toLowerCase()
		// Find matching names that are not already selected
		const matches = championNames.filter(name => 
			name.toLowerCase().includes(inputToLower) && !selectedChampions.includes(name)
		)
		setInput(input)
		setMatches(matches)
	}

  
	/**
	 * Removes the selected champion from the selectedChamps array.
	 * @param {Event} event - The event that triggered the function.
	 */
	const imgClick = (event) => {
		setSelectedChampions(selectedChampions.filter(name => name !== event.target.dataset.champion))
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
		}, 400) 
	}

	return ( 
		<div className="champcontainer">
			<div className="champimages">
				{selectedChampions.length > 0 && selectedChampions.map((champ) => (
					<img src={`/images/${champ}.png`} alt="" className="selectedChampImage" key={champ} onClick={imgClick} data-champion={champ}/>
				))} 
			</div>
			<div className="searchbarcontainer">
				<input type="text" value={input} onChange={handleInput} onFocus={handleInput} onBlur={handleBlur} className='champInput' placeholder='Search for your champion'/>
				<button className="resetchamps" onClick={() => { setSelectedChampions([]) }}>X</button>
				{matches.length > 0 && (
					<div className="options">
						<ul className="optul">
							{matches.map(match => (
								<li key={match} data-value={match} className='optli' onClick={(e) => { liClick(e.target) }}>
									<img src={`/images/${match}.png`} alt={match} className="championImg" data-value={match}/>
									<div className="optli-text" data-value={match}>{match}</div>
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