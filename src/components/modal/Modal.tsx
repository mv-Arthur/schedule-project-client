import React, { ReactNode } from "react";
import classes from "./modal.module.css";
import close from "../../images/closeico.svg";

type ModalPropsType = {
	children: ReactNode;
	show: boolean;
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Modal: React.FC<ModalPropsType> = (props: ModalPropsType) => {
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
