import React from "react";
import { Header } from "../../components/Header/Header";
import classes from "./teachers.module.css";
import { TeacherItem } from "../../components/teacherItem/TeacherItem";
import { CustomForm, Inputs } from "../../components/form/CustomForm";
import axios from "axios";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Container from "@mui/material/Container";
export type TeacherType = {
	id: number;
	name: string;
	surname: string;
	patronimyc: string;
};

export const Teachers: React.FC = () => {
	const [teachers, setTeachers] = React.useState<TeacherType[]>([]);
	const [parent] = useAutoAnimate();
	React.useEffect(() => {
		(async () => {
			try {
				const data: TeacherType[] = (await axios.get("http://localhost:5000/teacher")).data;
				setTeachers([...data].reverse());
			} catch (err) {
				console.log(err);
			}
		})();
	}, []);

	const setTeachersFromCB = async (formData: Inputs) => {
		try {
			const fetchingData = await axios.post("http://localhost:5000/teacher", {
				...formData,
			});
			setTeachers([fetchingData.data, ...teachers]);
		} catch (err) {
			console.log(err);
		}
	};

	const deleteTeacherCB = async (teacherId: number) => {
		try {
			await axios.delete(`http://localhost:5000/teacher/${teacherId}`);
			setTeachers(teachers.filter((el) => el.id !== teacherId));
		} catch (err) {
			console.log(err);
		}
	};

	const editTeacherCB = async (teacherId: number, updatedData: TeacherType) => {
		try {
			await axios.put(`http://localhost:5000/teacher/${teacherId}`, { ...updatedData });
			setTeachers(teachers.map((el) => (el.id === teacherId ? { ...updatedData } : el)));
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className={classes.teachersGl}>
			<Header title="Преподаватели" />
			<Container>
				<CustomForm setTeachersFromCB={setTeachersFromCB} />
				<div className={classes.teachersArea}>
					<div className={classes.itemWrapper} ref={parent}>
						{teachers.map((el) => {
							return <TeacherItem key={el.id} teacher={el} deleteTeacherCB={deleteTeacherCB} editTeacherCB={editTeacherCB} />;
						})}
					</div>
				</div>
			</Container>
		</div>
	);
};
