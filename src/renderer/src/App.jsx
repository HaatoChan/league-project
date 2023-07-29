import ElectronSideBar from './Components/ElectronSideBar/ElectronSideBar'
import HomePage from './Components/Pages/HomePage/Homepage'
import SettingsPage from './Components/Pages/SettingsPage/SettingsPage'
import JungleToolPage from './Components/Pages/JungleToolPage/JungleToolPage'
import { HashRouter, Routes, Route} from 'react-router-dom'
import LobbyPage from './Components/Pages/LobbyPage/LobbyPage'
import LobbyContextProvider from './Contexts/LobbyPageContext'
import CampSelectionContextProvider from './Contexts/CampSelectionContext'
import SideBarContextProvider from './Contexts/SideBarContext'
import { useState } from 'react'

function App() {

	const [endofgameData, setEndOfGameData] = useState(null)
	window.LCUApi.gameEnded((_event, data) => {
		setEndOfGameData(data)
	})
	window.LCUApi.lobbyEntered(() => {
		setEndOfGameData(null)
	})
	return (
		<HashRouter>
			<div className="container">
				<ElectronSideBar />
				<LobbyContextProvider>
					<SideBarContextProvider>
						<CampSelectionContextProvider>
							<Routes>
								<Route path="/" element={<HomePage />}/>
								<Route path="settings" element={ <SettingsPage />}/>
								<Route path='jungletool' element={<JungleToolPage />}/>
							</Routes>
							<CampSelectionContextProvider>
								<Routes>
									<Route path="lobby-screen" element={<LobbyPage endOfGameData={endofgameData}/>} />
								</Routes>	
							</CampSelectionContextProvider>
						</CampSelectionContextProvider>
					</SideBarContextProvider>
				</LobbyContextProvider>
			</div>
		</HashRouter>
	)
}

export default App
