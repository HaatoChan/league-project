/*import Map from './Components/Map/Map'
import CampSelectionContextProvider from './Contexts/CampSelectionContext'
import { CampSelectionContext } from './Contexts/CampSelectionContext' */
import ElectronSideBar from './Components/ElectronSideBar/ElectronSideBar'
import HomePage from './Components/Pages/HomePage/Homepage'
import SettingsPage from './Components/Pages/SettingsPage/SettingsPage'
import JungleToolPage from './Components/Pages/JungleToolPage/JungleToolPage'
import { HashRouter, Routes, Route} from 'react-router-dom'
import LobbyPage from './Components/Pages/LobbyPage/LobbyPage'
import LobbyContextProvider from './Contexts/LobbyPageContext'
import CampSelectionContextProvider from './Contexts/CampSelectionContext'
import SideBarContextProvider from './Contexts/SideBarContext'

function App() {
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
									<Route path="lobby-screen" element={<LobbyPage />} />
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
