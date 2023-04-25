/*import Map from './Components/Map/Map'
import CampSelectionContextProvider from './Contexts/CampSelectionContext'
import { CampSelectionContext } from './Contexts/CampSelectionContext' */
import ElectronSideBar from './Components/ElectronSideBar/ElectronSideBar'
import HomePage from './Components/Pages/HomePage/Homepage'
import SettingsPage from './Components/Pages/SettingsPage/SettingsPage'
import { BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
	return (
		<BrowserRouter>
			<div className="container">
				<ElectronSideBar />
				<Routes>
					<Route path="/" element={<HomePage />}/>
					<Route path="settings" element={ <SettingsPage />}/>
				</Routes>
				{ /*
			<CampSelectionContextProvider>
				<CampSelectionContext.Consumer>
					{() => {
						return <>
							<Map></Map>
						</>
					}}
				</CampSelectionContext.Consumer>
			</CampSelectionContextProvider>
				*/}
			</div>
		</BrowserRouter>
	)
}

export default App
