import React from "react";
import classes from "./teacherItem.module.css";
import { TeacherType } from "../../pages/teachers/Teachers";
import deleteIcon from "../../images/deleteico.svg";
import updateIcon from "../../images/updateico.svg";
import closeIcon from "../../images/closeico.svg";
import autoAnimate from "@formkit/auto-animate";
import { Modal } from "../modal/Modal";
import { CustomForm } from "../form/CustomForm";

type TeacherItemPropsType = {
	teacher: TeacherType;
	deleteTeacherCB: (teacherId: number) => void;
	editTeacherCB: (teacherId: number, updatedData: TeacherType) => void;
};

export const TeacherItem = ({ teacher, deleteTeacherCB, editTeacherCB }: TeacherItemPropsType) => {
	const [popup, setPopup] = React.useState(false);
	const [show, setShow] = React.useState(false);
	const parent = React.useRef(null);

	React.useEffect(() => {
		parent.current && autoAnimate(parent.current);
	}, [parent]);
	const onPopup = () => {
		setPopup(!popup);
	};

	const onDelete = () => {
		deleteTeacherCB(teacher.id);
	};

	const onShow = () => {
		setShow(!show);
	};

	return (
		<div className={classes.teacherItem} ref={parent}>
			<Modal show={show} setShow={setShow}>
				<CustomForm teacher={teacher} editTeachersFromCB={editTeacherCB} onShow={onShow} />
			</Modal>
			{!popup && <div className={classes.invisible} onClick={onPopup}></div>}
			<div className={classes.keys}>
				<span>Имя</span>
				<span>Фамилия</span>
				<span>Отчество</span>
			</div>
			<div className={classes.values}>
				<span>{teacher.name}</span>
				<span>{teacher.surname}</span>
				<span>{teacher.patronimyc}</span>
			</div>
			{popup && (
				<div className={classes.alternative}>
					<button onClick={onDelete}>
						<img src={deleteIcon} alt="delete" />
					</button>
					<button onClick={onShow}>
						<img src={updateIcon} alt="update" />
					</button>
					<button onClick={onPopup}>
						<img src={closeIcon} alt="close" />
					</button>
				</div>
			)}
		</div>
	);
};