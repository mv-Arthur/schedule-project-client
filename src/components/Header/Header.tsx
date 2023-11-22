import React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
type HeaderPropsType = {
	title: string;
};

export const Header: React.FC<HeaderPropsType> = (props: HeaderPropsType) => {
	return (
		<Box sx={{ flexGrow: 1 }} style={{ marginBottom: 30 }}>
			<AppBar position="static">
				<Toolbar>
					<IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						{props.title}
					</Typography>
				</Toolbar>
			</AppBar>
		</Box>
	);
};
