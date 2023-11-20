import React from "react";
import classes from "./header.module.css";

type HeaderPropsType = {
	title: string;
};

export const Header: React.FC<HeaderPropsType> = (props: HeaderPropsType) => {
	return (
		<header className={classes.header}>
			<div className="container">
				<h2 className={classes.title}>{props.title}</h2>
				<div className={classes.burger}>
					<span className={classes.child}></span>
					<span className={classes.child}></span>
					<span className={classes.child}></span>
				</div>
			</div>
		</header>
	);
};
