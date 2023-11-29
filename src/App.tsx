import React from "react";
import { Teachers } from "./pages/teachers/Teachers";
import { Route, Routes } from "react-router-dom";
import { Discipline } from "./pages/discipline/Discipline";
import { Group } from "./pages/group/Group";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path={"/"} element={<div>main</div>} />
				<Route path={"/teacher"} element={<Teachers />} />
				<Route path={"/discipline/:id"} element={<Discipline />} />
				<Route path={"/group"} element={<Group />} />
			</Routes>
		</div>
	);
}

export default App;
