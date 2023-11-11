import React from "react";
import { Header } from "../../components/Header/Header";
import classes from "./teachers.module.css";
import { TeacherItem } from "../../components/teacherItem/TeacherItem";
import { CustomForm } from "../../components/form/CustomForm";
import axios from "axios";
import { useAutoAnimate } from "@formkit/auto-animate/react";
export type TeacherType = {
	id: number;
	name: string;
	surname: string;
	patronimyc: string;
};

export const Teachers = () => {
	const [teachers, setTeachers] = React.useState<TeacherType[]>([]);
	const [parent] = useAutoAnimate();
	React.useEffect(() => {
		const fetchTeachers = async () => {
			const data: TeacherType[] = (await axios.get("http://localhost:5000/teacher")).data;
			setTeachers([...data].reverse());
		};
		fetchTeachers();
	}, []);

	const setTeachersFromCB = (formData: TeacherType) => {
		setTeachers([formData, ...teachers]);
	};

	const deleteTeacherCB = async (teacherId: number) => {
		try {
			const deletedTeacherId = await axios.delete(`http://localhost:5000/teacher/${teacherId}`);
			console.log(deletedTeacherId);
			setTeachers(teachers.filter((el) => el.id !== teacherId));
		} catch (err) {
			console.log(err);
		}
	};

	const editTeacherCB = async (teacherId: number, updatedData: TeacherType) => {
		setTeachers(teachers.map((el) => (el.id === teacherId ? { ...updatedData } : el)));
	};

	return (
		<div className={classes.teachersGl}>
			<Header />
			<CustomForm setTeachersFromCB={setTeachersFromCB} />
			<div className={classes.teachersArea}>
				<div className="container">
					<div className={classes.itemWrapper} ref={parent}>
						{teachers.map((el) => {
							return <TeacherItem key={el.id} teacher={el} deleteTeacherCB={deleteTeacherCB} />;
						})}
					</div>
				</div>
			</div>
		</div>
	);
};
