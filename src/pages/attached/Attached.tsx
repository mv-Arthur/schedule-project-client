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
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { AttachedItem } from "../../components/attachedItem/AttachedItem";
import Snackbar from "@mui/material/Snackbar";
import Alert, { AlertProps } from "@mui/material/Alert";
import { SearchBar } from "./SearchBar";
type DisciplineType = {
	allHours: number;
	attachedDisciplineId: number;
	hoursQtyFirstSemester: number;
	hoursQtySecondSemester: number;
	id: number;
	name: string;
	teacherId: number;
	weeklyLoadFirstWeek: number;
	weeklyLoadSecondWeek: number;
};

export type AttachedType = {
	id: number;
	discipline: DisciplineType;
	teacher: TeacherType;
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
	const [attached, setAttached] = React.useState<AttachedType[]>([]);
	const [snackbar, setSnackbar] = React.useState<Pick<AlertProps, "children" | "severity"> | null>(null);
	const [searchedAttached, setSearchedAttached] = React.useState<AttachedType[]>([]);
	const groupId = useParams().id;

	React.useEffect(() => {
		(async () => {
			try {
				const data = (await axios.get(`http://localhost:5000/group/${groupId}`)).data;
				console.log(data.disciplines);
				setAttached([...attached, ...data.disciplines]);
				setSearchedAttached([...attached, ...data.disciplines]);
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
			try {
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
		if (changedDiscipline && changedTeacher) {
			(async () => {
				const founded = attached.find((el) => {
					return el.discipline.name === changedDiscipline.name;
				});

				if (!founded) {
					const attachedThis: AttachedType = (
						await axios.post(`http://localhost:5000/group/${groupId}`, {
							disciplineId: changedDiscipline.id,
							teacherId: changedTeacher.id,
						})
					).data;

					setAttached([...attached, attachedThis]);
					setSearchedAttached([...attached, attachedThis]);
					setSnackbar({ children: "Дисциплина успешно прикреплена", severity: "success" });
				} else {
					setSnackbar({ children: "элемент уже есть в списке", severity: "error" });
				}
			})();
		}
	};

	const DemoPaper = styled(Paper)(({ theme }) => ({
		padding: theme.spacing(2),
		...theme.typography.body2,
		textAlign: "center",
		marginBottom: "10px",
	}));
	const onDelete = async (id: number) => {
		try {
			await axios.delete(`http://localhost:5000/group/attached/${id}`);
			setAttached(attached.filter((el) => el.id !== id));
			setSearchedAttached(attached.filter((el) => el.id !== id));
			setSnackbar({ children: "группа успешно откреплена", severity: "success" });
		} catch (err) {
			setSnackbar({ children: `Непредвиденная ошибка: ${err.message}`, severity: "error" });
		}
	};
	const onSearch = (value: string) => {
		setSearchedAttached(attached.filter((el) => el.discipline.name.toLowerCase().includes(value.toLowerCase())));
	};
	const handleCloseSnackbar = () => setSnackbar(null);
	return (
		<>
			<Header title="Дисциплины группы" />
			<Container>
				<GroupItem group={group} />

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
										{option.surname} {option.name} {option.patronimyc}
									</MenuItem>
								))}
							</TextField>

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
							<Button variant="outlined" onClick={onSubmit} style={{ width: 300 }}>
								Прикрепить
							</Button>
						</FormControl>
					</DemoPaper>
				</div>
				<SearchBar onSearch={onSearch} />
				<div className={classes.attachedWrapper}>
					{searchedAttached.map((el) => (
						<AttachedItem onDeleteCb={onDelete} key={el.id} disAndTeach={el} />
					))}
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
