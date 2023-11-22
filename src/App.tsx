import React from "react";
import { Teachers } from "./pages/teachers/Teachers";
import { Route, Routes } from "react-router-dom";
import { Discipline } from "./pages/discipline/Discipline";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path={"/"} element={<div>main</div>} />
				<Route path={"/teacher"} element={<Teachers />} />
				<Route path={"/discipline/:id"} element={<Discipline />} />
			</Routes>
		</div>
	);
}

export default App;
