/*import Map from './Components/Map/Map'
import CampSelectionContextProvider from './Contexts/CampSelectionContext'
import { CampSelectionContext } from './Contexts/CampSelectionContext' */
import ElectronSideBar from './Components/ElectronSideBar/ElectronSideBar'
import HomePage from './Components/Pages/HomePage/Homepage'

function App() {
	return (
		<div className="container">
			<ElectronSideBar />
			<HomePage />
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
	)
}

export default App
