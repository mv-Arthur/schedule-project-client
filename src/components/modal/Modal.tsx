import React, { ReactNode } from "react";
import classes from "./modal.module.css";
import close from "../../images/closeico.svg";

type ModalPropsType = {
	children: ReactNode;
	show: boolean;
	setShow: (show: boolean) => void;
};

export const Modal = (props: ModalPropsType) => {
	return (
		<>
			{props.show && (
				<div className={classes.outside}>
					<div className={classes.modal}>
						<button onClick={() => props.setShow(!props.show)}>
							<img src={close} alt="close" />
						</button>
						{props.children}
					</div>
				</div>
			)}
		</>
	);
};
