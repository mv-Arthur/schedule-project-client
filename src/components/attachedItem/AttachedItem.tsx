import React from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { AttachedType } from "../../pages/attached/Attached";
type AttachedItemPropsType = {
	disAndTeach: AttachedType;
};

export const AttachedItem: React.FC<AttachedItemPropsType> = (props: AttachedItemPropsType) => {
	const DemoPaper = styled(Paper)(({ theme }) => ({
		padding: theme.spacing(2),
		...theme.typography.body2,
		textAlign: "center",
		marginBottom: "10px",
	}));
	return (
		<DemoPaper>{`${props.disAndTeach.teacher.name} ${props.disAndTeach.teacher.surname} ${props.disAndTeach.teacher.patronimyc} - ${props.disAndTeach.discipline.name}`}</DemoPaper>
	);
};
