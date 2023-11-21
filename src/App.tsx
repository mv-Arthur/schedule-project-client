import React from "react";
import { Teachers } from "./pages/teachers/Teachers";
import { Route, Routes } from "react-router-dom";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path={"/teacher"} element={<Teachers />} />
				<Route path={"/discipline"} element={<div>здесь отобразиться дисциплина</div>} />
			</Routes>
		</div>
	);
}

export default App;
