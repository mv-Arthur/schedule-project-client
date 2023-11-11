import React from "react";
import classes from "./header.module.css";

export const Header = () => {
	return (
		<header className={classes.header}>
			<div className="container">
				<h2 className={classes.title}>Преподаватели</h2>
				<div className={classes.burger}>
					<span className={classes.child}></span>
					<span className={classes.child}></span>
					<span className={classes.child}></span>
				</div>
			</div>
		</header>
	);
};
