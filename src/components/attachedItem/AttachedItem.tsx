import React from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { AttachedType } from "../../pages/attached/Attached";
import CloseIcon from "@mui/icons-material/Close";
type AttachedItemPropsType = {
	disAndTeach: AttachedType;
	onDeleteCb: (id: number) => void;
};

export const AttachedItem: React.FC<AttachedItemPropsType> = (props: AttachedItemPropsType) => {
	const DemoPaper = styled(Paper)(({ theme }) => ({
		padding: theme.spacing(2),
		...theme.typography.body2,
		textAlign: "center",
		marginBottom: "10px",
	}));
	return (
		<DemoPaper style={{ display: "flex", justifyContent: "space-between" }}>
			<div>{`${props.disAndTeach.teacher.name} ${props.disAndTeach.teacher.surname} ${props.disAndTeach.teacher.patronimyc} - ${props.disAndTeach.discipline.name}`}</div>
			<button
				onClick={() => {
					props.onDeleteCb(props.disAndTeach.id);
				}}
				style={{ border: "none", background: "transparent" }}
			>
				<CloseIcon />
			</button>
		</DemoPaper>
	);
};
