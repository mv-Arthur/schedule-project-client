import Container from "@mui/material/Container";
import React from "react";
import { Header } from "../../components/Header/Header";
import { GroupForm } from "../../components/group-form/GroupForm";
import { GroupItem } from "../../components/group-item/GroupItem";
import classes from "./group.module.css";
import axios from "axios";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Snackbar from "@mui/material/Snackbar";
import Alert, { AlertProps } from "@mui/material/Alert";
export interface GroupType {
	id: number;
	groupNumber: string;
	numberOfCourse: number;
	nameOfSpec: string;
}
export type groupCreationAttrs = Omit<GroupType, "id">;
export const Group: React.FC = () => {
	const [group, setGroup] = React.useState<GroupType[]>([]);
	const [parent] = useAutoAnimate();
	const [snackbar, setSnackbar] = React.useState<Pick<AlertProps, "children" | "severity"> | null>(null);

	React.useEffect(() => {
		(async () => {
			try {
				const response: GroupType[] = (await axios.get("http://localhost:5000/group")).data;
				setGroup(response.reverse());
			} catch (err) {
				console.log(err);
				setSnackbar({ children: `Непредвиденная ошибка: ${err.message}`, severity: "error" });
			}
		})();
	}, []);

	const addGroup = async (newGroup: groupCreationAttrs) => {
		try {
			const postedGroup = (await axios.post("http://localhost:5000/group", newGroup)).data;
			setGroup([postedGroup, ...group]);
			setSnackbar({ children: "Группа успешно добавлена", severity: "success" });
		} catch (err) {
			console.log(err);
			setSnackbar({ children: `Непредвиденная ошибка: ${err.message}`, severity: "error" });
		}
	};

	const deleteGroup = async (groupId: number) => {
		try {
			await axios.delete(`http://localhost:5000/group/${groupId}`);
			setGroup(group.filter((el) => el.id !== groupId));
			setSnackbar({ children: "Группа успешно удалена", severity: "success" });
		} catch (err) {
			console.log(err);
			setSnackbar({ children: `Непредвиденная ошибка: ${err.message}`, severity: "error" });
		}
	};

	const editGroup = async (modifyGroup: GroupType) => {
		try {
			axios.put(`http://localhost:5000/group/${modifyGroup.id}`, modifyGroup);
			setGroup(group.map((el) => (el.id === modifyGroup.id ? { ...modifyGroup } : el)));
			setSnackbar({ children: "Преподаватель успешно редактирована", severity: "success" });
		} catch (err) {
			console.log(err);
			setSnackbar({ children: `Непредвиденная ошибка: ${err.message}`, severity: "error" });
		}
	};
	const handleCloseSnackbar = () => setSnackbar(null);
	return (
		<>
			<Header title="Группы" />
			<Container>
				<GroupForm addGroup={addGroup} />
				<div className={classes.itemWrapper} ref={parent}>
					{group.map((el) => {
						return <GroupItem editGroup={editGroup} group={el} key={el.id} full deleteGroup={deleteGroup} />;
					})}
				</div>
				{!!snackbar && (
					<Snackbar open anchorOrigin={{ vertical: "bottom", horizontal: "center" }} onClose={handleCloseSnackbar} autoHideDuration={6000}>
						<Alert {...snackbar} onClose={handleCloseSnackbar} />
					</Snackbar>
				)}
			</Container>
		</>
	);
};
