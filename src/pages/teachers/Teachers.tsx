import React from "react";
import { Header } from "../../components/Header/Header";
import classes from "./teachers.module.css";
import { TeacherItem } from "../../components/teacherItem/TeacherItem";
import { CustomForm, Inputs } from "../../components/form/CustomForm";
import axios from "axios";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";
import Alert, { AlertProps } from "@mui/material/Alert";

export type TeacherType = {
	id: number;
	name: string;
	surname: string;
	patronimyc: string;
};

export const Teachers: React.FC = () => {
	const [teachers, setTeachers] = React.useState<TeacherType[]>([]);
	const [parent] = useAutoAnimate();
	const [snackbar, setSnackbar] = React.useState<Pick<AlertProps, "children" | "severity"> | null>(null);
	const [searchedTeachers, setSearchedTeachers] = React.useState<TeacherType[]>([]);
	React.useEffect(() => {
		(async () => {
			try {
				const data: TeacherType[] = (await axios.get("http://localhost:5000/teacher")).data;
				setTeachers([...data].reverse());
				setSearchedTeachers([...data].reverse());
			} catch (err) {
				console.log(err);
				setSnackbar({ children: `Непредвиденная ошибка: ${err.message}`, severity: "error" });
			}
		})();
	}, []);

	const setTeachersFromCB = async (formData: Inputs) => {
		try {
			const fetchingData = await axios.post("http://localhost:5000/teacher", {
				...formData,
			});
			setSearchedTeachers([fetchingData.data, ...teachers]);
			setTeachers([fetchingData.data, ...teachers]);
			setSnackbar({ children: "Преподаватель успешно добавлен", severity: "success" });
		} catch (err) {
			console.log(err);
			setSnackbar({ children: `Непредвиденная ошибка: ${err.message}`, severity: "error" });
		}
	};

	const deleteTeacherCB = async (teacherId: number) => {
		try {
			await axios.delete(`http://localhost:5000/teacher/${teacherId}`);
			setSearchedTeachers(teachers.filter((el) => el.id !== teacherId));
			setTeachers(teachers.filter((el) => el.id !== teacherId));
			setSnackbar({ children: "Преподаватель успешно удален", severity: "success" });
		} catch (err) {
			console.log(err);
			setSnackbar({ children: `Непредвиденная ошибка: ${err.message}`, severity: "error" });
		}
	};

	const editTeacherCB = async (teacherId: number, updatedData: TeacherType) => {
		try {
			await axios.put(`http://localhost:5000/teacher/${teacherId}`, { ...updatedData });
			setSearchedTeachers(teachers.map((el) => (el.id === teacherId ? { ...updatedData } : el)));
			setTeachers(teachers.map((el) => (el.id === teacherId ? { ...updatedData } : el)));
			setSnackbar({ children: "Преподаватель успешно отредактирован", severity: "success" });
		} catch (err) {
			console.log(err);
			setSnackbar({ children: `Непредвиденная ошибка: ${err.message}`, severity: "error" });
		}
	};

	const onSearch = (inputValue: string) => {
		setSearchedTeachers(teachers.filter((el) => el.surname.toLowerCase().includes(inputValue.toLowerCase())));
	};
	const handleCloseSnackbar = () => setSnackbar(null);
	return (
		<div className={classes.teachersGl}>
			<Header title="Преподаватели" />
			<Container>
				<CustomForm setTeachersFromCB={setTeachersFromCB} onSearch={onSearch} />
				<div className={classes.teachersArea}>
					<div className={classes.itemWrapper} ref={parent}>
						{searchedTeachers.map((el) => {
							return <TeacherItem full key={el.id} teacher={el} deleteTeacherCB={deleteTeacherCB} editTeacherCB={editTeacherCB} />;
						})}
					</div>
				</div>
				{!!snackbar && (
					<Snackbar open anchorOrigin={{ vertical: "bottom", horizontal: "center" }} onClose={handleCloseSnackbar} autoHideDuration={6000}>
						<Alert {...snackbar} onClose={handleCloseSnackbar} />
					</Snackbar>
				)}
			</Container>
		</div>
	);
};
