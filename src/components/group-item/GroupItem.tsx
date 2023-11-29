import React from "react";
import classes from "./group-item.module.css";
import deleteIcon from "../../images/deleteico.svg";
import updateIcon from "../../images/updateico.svg";
import closeIcon from "../../images/closeico.svg";
import showMoreIcon from "../../images/showmoreico.svg";
import { Modal } from "../modal/Modal";
import { NavLink } from "react-router-dom";
import { GroupType } from "../../pages/group/Group";
import { GroupForm } from "../group-form/GroupForm";

type GroupItemPropsType = {
	deleteGroup: (groupId: number) => void;
	group: GroupType;
	full?: boolean;
	editGroup: (modifyGroup: GroupType) => void;
};

export const GroupItem: React.FC<GroupItemPropsType> = (props: GroupItemPropsType) => {
	const [show, setShow] = React.useState(false);
	const [popup, setPopup] = React.useState(false);
	const onPopup = () => {
		setPopup(!popup);
	};
	const onShow = () => {
		setShow(!show);
	};

	const onDelete = () => {
		props.deleteGroup(props.group.id);
	};

	return (
		<div className={classes.teacherItem}>
			{props.full && (
				<>
					<Modal show={show} setShow={setShow}>
						<GroupForm setShow={setShow} editGroup={props.editGroup} group={props.group} />
					</Modal>
					{!popup && <div className={classes.invisible} onClick={onPopup}></div>}
				</>
			)}
			<div className={classes.keys}>
				<span>номер группы</span>
				<span>номер курса</span>
				<span>наименование специальности</span>
			</div>
			<div className={classes.values}>
				<span>{props.group.groupNumber}</span>
				<span>{props.group.numberOfCourse}</span>
				<span>{props.group.nameOfSpec}</span>
			</div>
			{props.full && (
				<>
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
							<NavLink to={``}>
								<img src={showMoreIcon} alt="show more" />
							</NavLink>
						</div>
					)}
				</>
			)}
		</div>
	);
};
