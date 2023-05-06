import { useEffect, useState, useContext } from 'react'
import './lobbypage.css'
import { LobbyContext } from '../../../Contexts/LobbyPageContext'
import ChampionSplash from './ChampionSplash/ChampionSplash'

/**
 * Defines the lobby page
 * @returns {HTMLElement} - Returns the lobby page.
 */
const LobbyPage = () => {

	const {championIds, teamArray, imgArray} = useContext(LobbyContext)

	return ( 
		<div className="lobbypagecontainer">
			<div className="teamcomp">
				{/*}	<div className="enemytop">			
					{Array.isArray(teamArray) && teamArray[5]?.championId !== 0 && championIds[teamArray[5]?.championId]?.name}
					<img src={imgArray[5]?.championImage} alt="" className='champSplashArt'/>
				</div>{*/}
				<ChampionSplash 
					champName={Array.isArray(teamArray) && teamArray[5]?.championId !== 0 && championIds[teamArray[5]?.championId]?.name}
					imgUrl={imgArray[5]?.championImage}
				/>
				{/*}	<div className="enemyjgl">			
					{Array.isArray(teamArray) && teamArray[6]?.championId !== 0 && championIds[teamArray[6]?.championId]?.name}
					<img src={imgArray[6]?.championImage} alt="" className='champSplashArt'/>
				</div> {*/}
				<ChampionSplash 
					champName={Array.isArray(teamArray) && teamArray[6]?.championId !== 0 && championIds[teamArray[6]?.championId]?.name}
					imgUrl={imgArray[6]?.championImage}
				/>
				{/*}<div className="enemymid">				
					{Array.isArray(teamArray) && teamArray[7]?.championId !== 0 && championIds[teamArray[7]?.championId]?.name}
					<img src={imgArray[7]?.championImage} alt="" className='champSplashArt'/>
				</div> {*/}
				<ChampionSplash 
					champName={Array.isArray(teamArray) && teamArray[7]?.championId !== 0 && championIds[teamArray[7]?.championId]?.name}
					imgUrl={imgArray[7]?.championImage}
				/>
				{/*}	<div className="enemybot">				
					{Array.isArray(teamArray) && teamArray[8]?.championId !== 0 && championIds[teamArray[8]?.championId]?.name}
					<img src={imgArray[8]?.championImage} alt="" className='champSplashArt'/>
				</div> {*/}
				<ChampionSplash 
					champName={Array.isArray(teamArray) && teamArray[8]?.championId !== 0 && championIds[teamArray[8]?.championId]?.name}
					imgUrl={imgArray[8]?.championImage}
				/>
				{/*}	<div className="enemysupp">				
					{Array.isArray(teamArray) && teamArray[9]?.championId !== 0 && championIds[teamArray[9]?.championId]?.name}
					<img src={imgArray[9]?.championImage} alt="" className='champSplashArt'/>
			</div> {*/}
				<ChampionSplash 
					champName={Array.isArray(teamArray) && teamArray[9]?.championId !== 0 && championIds[teamArray[9]?.championId]?.name}
					imgUrl={imgArray[9]?.championImage}
				/>
				<ChampionSplash 
					champName={Array.isArray(teamArray) && teamArray[0]?.championId !== 0 && championIds[teamArray[0]?.championId]?.name}
					imgUrl={imgArray[0]?.championImage}
				/>
				{/*}	<div className="bluetop">
					<img src={imgArray[0]?.championImage} alt="" className='champSplashArt'/>
	</div> {*/}
				{/*}	<div className="bluejgl">			
					{Array.isArray(teamArray) && teamArray[1]?.championId !== 0 && championIds[teamArray[1]?.championId]?.name}
					<img src={imgArray[1]?.championImage} alt="" className='champSplashArt'/>
	</div> {*/}
				<ChampionSplash 
					champName={Array.isArray(teamArray) && teamArray[1]?.championId !== 0 && championIds[teamArray[1]?.championId]?.name}
					imgUrl={imgArray[1]?.championImage}
				/>
				{/*}	<div className="bluemid">				
					{Array.isArray(teamArray) && teamArray[2]?.championId !== 0 && championIds[teamArray[2]?.championId]?.name}
					<img src={imgArray[2]?.championImage} alt="" className='champSplashArt'/>
				</div> {*/}
				<ChampionSplash 
					champName={Array.isArray(teamArray) && teamArray[2]?.championId !== 0 && championIds[teamArray[2]?.championId]?.name}
					imgUrl={imgArray[2]?.championImage}
				/>
				{/*}	<div className="bluebot">				
					{Array.isArray(teamArray) && teamArray[3]?.championId !== 0 && championIds[teamArray[3]?.championId]?.name}
					<img src={imgArray[3]?.championImage} alt="" className='champSplashArt'/>
			</div> {*/}
				<ChampionSplash 
					champName={Array.isArray(teamArray) && teamArray[3]?.championId !== 0 && championIds[teamArray[3]?.championId]?.name}
					imgUrl={imgArray[3]?.championImage}
				/>
				{/*}	<div className="bluesupp">				
					{Array.isArray(teamArray) && teamArray[4]?.championId !== 0 && championIds[teamArray[4]?.championId]?.name}
					<img src={imgArray[4]?.championImage} alt="" className='champSplashArt'/>
		</div> {*/}
				<ChampionSplash 
					champName={Array.isArray(teamArray) && teamArray[4]?.championId !== 0 && championIds[teamArray[4]?.championId]?.name}
					imgUrl={imgArray[4]?.championImage}
				/>
			</div>
			<div className="statistics">
                
			</div>
			<div className="mapdiv">
                
			</div>
			<div className="routeselector">
                
			</div>
			<div className="camporder">
                
			</div>
		</div>
	)
}
 
export default LobbyPage