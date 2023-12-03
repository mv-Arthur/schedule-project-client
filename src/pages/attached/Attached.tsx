import React, { ChangeEvent } from "react";
import { Header } from "../../components/Header/Header";
import Container from "@mui/material/Container";
import { GroupItem } from "../../components/group-item/GroupItem";
import axios from "axios";
import { useParams } from "react-router-dom";
import { GroupType } from "../group/Group";
import Button from "@mui/material/Button";
import classes from "./attached.module.css";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { TeacherType } from "../teachers/Teachers";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";

type DisciplineType = {
	allHours: 5;
	attachedDisciplineId: 12;
	hoursQtyFirstSemester: 4;
	hoursQtySecondSemester: 1;
	id: 1;
	name: "Английский язык";
	teacherId: 1;
	weeklyLoadFirstWeek: 123;
	weeklyLoadSecondWeek: 4;
};

export const Attached: React.FC = () => {
	const [group, setGroup] = React.useState<GroupType>({
		id: 0,
		groupNumber: "",
		numberOfCourse: 0,
		nameOfSpec: "",
	});

	const [teachers, setTeachers] = React.useState<TeacherType[]>([]);
	const [changedTeacher, setChangedTeacher] = React.useState<TeacherType>();
	const [disciplinesOfTeacher, setDisciplinesOfTeacher] = React.useState<DisciplineType[]>([]);
	const [changedDiscipline, setChangedDiscipline] = React.useState<DisciplineType>();
	const groupId = useParams().id;
	React.useEffect(() => {
		(async () => {
			try {
				const data = (await axios.get(`http://localhost:5000/group/${groupId}`)).data;
				setGroup(data);
			} catch (err) {
				console.log(err);
			}
			try {
				const tData = (await axios.get(`http://localhost:5000/teacher`)).data;
				setTeachers(tData);
			} catch (err) {
				console.log(err);
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const id = Number(event.target.value);
		const founded = teachers.find((el) => el.id === id);
		if (founded) {
			setChangedTeacher(founded);
			(async () => {
				const disciplines = (await axios.get(`http://localhost:5000/teacher/${founded.id}`)).data.disciplines;
				setDisciplinesOfTeacher(disciplines);
			})();
		}
	};
	const handleChange2 = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const id = Number(event.target.value);
		const founded = disciplinesOfTeacher.find((el) => el.id === id);
		if (founded) {
			setChangedDiscipline(founded);
		}
	};

	const onSubmit = () => {
		console.log(changedTeacher, changedDiscipline);
	};

	const DemoPaper = styled(Paper)(({ theme }) => ({
		padding: theme.spacing(2),
		...theme.typography.body2,
		textAlign: "center",
	}));

	return (
		<>
			<Header title="Дисциплины группы" />
			<Container>
				<GroupItem group={group} />
				<div className={classes.buttonWrapper}>
					<Button variant="contained">Прикрепить дисциплину</Button>
				</div>
				<div>
					<DemoPaper variant="elevation">
						<FormControl fullWidth>
							<TextField
								style={{ marginBottom: 30 }}
								onChange={handleChange}
								id="outlined-select-currency"
								select
								label="Преподаватель"
								defaultValue=""
								value={changedTeacher && changedTeacher.id}
							>
								{teachers.map((option) => (
									<MenuItem key={option.id} value={option.id}>
										{option.surname}
									</MenuItem>
								))}
							</TextField>
							{!!disciplinesOfTeacher.length && (
								<TextField
									style={{ marginBottom: 30 }}
									onChange={handleChange2}
									id="outlined-select-currency"
									select
									label="Дисциплина"
									defaultValue=""
									value={changedDiscipline && changedDiscipline.id}
								>
									{disciplinesOfTeacher.map((option) => (
										<MenuItem key={option.id} value={option.id}>
											{option.name}
										</MenuItem>
									))}
								</TextField>
							)}
							<Button variant="outlined" onClick={onSubmit}>
								сохранить
							</Button>
						</FormControl>
					</DemoPaper>
				</div>
			</Container>
		</>
	);
};
