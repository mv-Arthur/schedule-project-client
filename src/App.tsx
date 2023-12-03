import React from "react";
import { Teachers } from "./pages/teachers/Teachers";
import { Route, Routes } from "react-router-dom";
import { Discipline } from "./pages/discipline/Discipline";
import { Group } from "./pages/group/Group";
import { Attached } from "./pages/attached/Attached";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path={"/"} element={<div>main</div>} />
				<Route path={"/teacher"} element={<Teachers />} />
				<Route path={"/discipline/:id"} element={<Discipline />} />
				<Route path={"/group"} element={<Group />} />
				<Route path={"/group/:id"} element={<Attached />} />
			</Routes>
		</div>
	);
}

export default App;
