import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import BookIcon from "@mui/icons-material/Book";
import GroupIcon from "@mui/icons-material/Group";
import { NavLink } from "react-router-dom";
type HeaderPropsType = {
	title: string;
};
type Anchor = "top" | "left" | "bottom" | "right";
export const Header: React.FC<HeaderPropsType> = (props: HeaderPropsType) => {
	const [state, setState] = React.useState({
		left: false,
	});
	const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
		if (event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};
	const list = (anchor: Anchor) => (
		<Box
			sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
			role="presentation"
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<List>
				<NavLink to="/teacher" style={{ textDecoration: "none", color: "#000" }}>
					<ListItem disablePadding>
						<ListItemButton>
							<ListItemIcon>
								<BookIcon />
							</ListItemIcon>
							<ListItemText primary={"Преподаватели"} />
						</ListItemButton>
					</ListItem>
				</NavLink>
				<NavLink to="/group" style={{ textDecoration: "none", color: "#000" }}>
					<ListItem disablePadding>
						<ListItemButton>
							<ListItemIcon>
								<GroupIcon />
							</ListItemIcon>
							<ListItemText primary={"Группы"} />
						</ListItemButton>
					</ListItem>
				</NavLink>
			</List>
		</Box>
	);
	return (
		<>
			<Box sx={{ flexGrow: 1 }} style={{ marginBottom: 30 }}>
				<AppBar position="static">
					<Toolbar>
						<IconButton onClick={toggleDrawer("left", true)} size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
							<MenuIcon />
						</IconButton>
						<Drawer anchor={"left"} open={state["left"]} onClose={toggleDrawer("left", false)}>
							{list("left")}
						</Drawer>
						<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
							{props.title}
						</Typography>
					</Toolbar>
				</AppBar>
			</Box>
		</>
	);
};
