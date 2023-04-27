import { useEffect, useContext, useState } from 'react'
import './expdisplay.css'
import {CampSelectionContext} from '../../../../Contexts/CampSelectionContext'
import coinImage from '../../../../assets/currency_rp_490px.png'
import { expThresholds } from '../../../../Data/Arrays'
import SideSelect from '../SideSelect/SideSelect'

/**
 * Defines the EXP display.
 * @returns {HTMLElement} - Returns an exp display.
 */
const ExpDisplay = () => {
	const { selectedCamps, totalExp, level, totalRequired, totalGold } = useContext(CampSelectionContext)
	const [copiedStateArray, setCopiedStateArray] = useState([])
	
	useEffect(() => {
		if (selectedCamps.length > 0) {
			let currentGold = 0
			let currentExp = 0
			let currentLevel = 1
			for (let i = 0; i < selectedCamps.length; i++) {
				currentGold += Number(selectedCamps[i].dataset.goldvalue)
				let expValue
				i === 0
					? expValue = Number(selectedCamps[i].dataset.expvalue) + 150
					: expValue = Number(selectedCamps[i].dataset.expvalue)
				currentExp += expValue
				if (currentExp >= expThresholds[currentLevel]) {
					currentLevel++
				}
				selectedCamps[i].setAttribute('data-cumulativegold', currentGold)
				selectedCamps[i].setAttribute('data-level', currentLevel)
				selectedCamps[i].setAttribute('data-name', selectedCamps[i].id.split('-').join(' '))
			}
			setCopiedStateArray(selectedCamps)
		}
		if(selectedCamps.length === 0) {
			setCopiedStateArray(selectedCamps)
		}
	}, [selectedCamps])
    
    

	return (  
		<div className="expDisplay">
			<table>
				<thead>
					<tr>
						<th className='exp-count-th'>Camp</th>
						<th className='exp-count-th'>Level</th>
						<th className='exp-count-th'>Cumulative Gold</th>
					</tr>
				</thead>
				<tbody>
					{copiedStateArray.map((camp) => (
						<tr key={camp.id}>
							<td className="campName-td">{camp.dataset.name}</td>
							<td>{camp.dataset.level}</td>
							<td style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{camp.dataset.cumulativegold}
								<img src={coinImage} alt="image of a coin" className="coinTd" />
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className="undermapcontainer">
				<div className="golddiv">
					<p className="totalGold" data-testid="totalGold">{totalGold} </p>
					<img src={coinImage} alt="image of a coin" className="coin" />
				</div>
				<div className="expbar">		
					<div className="expbar-inner" style={{width: `${totalExp/totalRequired[level-1]*100}%`}}></div>
					<p className="totalExp" data-testid="totalExp"><span className="requiredExp">{totalExp}/{totalRequired[level -1]}</span> <br /><span className="currentlevel"> Level {level}</span></p>
				</div>
				<div className="sideselect"><SideSelect /></div>
			</div>
		</div>

	)
}
 
export default ExpDisplay