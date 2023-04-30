import './valuesdisplay.css'
import { useContext } from 'react'
import { SideBarContext } from '../../../../Contexts/SideBarContext'
import coinImage from '../../../../assets/currency_rp_490px.png'
import { campValues } from '../../../../Data/Arrays'

/**
 * Defines a JSX elements for camp values.
 * @returns {HTMLElement} - Returns a JSX element displaying the values.
 */
const ValuesDisplay = () => {
	
	const { valuesActive } = useContext(SideBarContext)

	return ( 
		<>
			<div className="valuedisplay" data-isactive={valuesActive} data-testid="valuesdisplay">
				<table>
					<thead>
						<tr>
							<th className='value-display-th'>Camp</th>
							<th className='value-display-th'>Experience</th>
							<th className='value-display-th'
							>Gold</th>
						</tr>
					</thead>
					<tbody>
						{campValues.map((camp) => (
							<tr key={camp.name}>
								<td>{camp.name}</td>
								<td>{camp.exp}</td>
								<td style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{camp.gold}
									<img src={coinImage} alt="image of a coin" className="coinTd" />
								</td>
							</tr>
						))}
					</tbody>
				</table>

			</div> 
		</>
	)
}
 
export default ValuesDisplay