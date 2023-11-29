import React from "react";
import Container from "@mui/material/Container";
import { Header } from "../../components/Header/Header";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import Alert, { AlertProps } from "@mui/material/Alert";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
	GridRowsProp,
	GridRowModesModel,
	GridRowModes,
	DataGrid,
	GridColDef,
	GridToolbarContainer,
	GridActionsCellItem,
	GridEventListener,
	GridRowId,
	GridRowModel,
	GridRowEditStopReasons,
} from "@mui/x-data-grid";

import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import { TeacherItem } from "../../components/teacherItem/TeacherItem";
import { TeacherType } from "../teachers/Teachers";
const initialRows: GridRowsProp = [];

interface EditToolbarProps {
	setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
	setRowModesModel: (newModel: (oldModel: GridRowModesModel) => GridRowModesModel) => void;
	teacherId: number;
}

function EditToolbar(props: EditToolbarProps) {
	const { setRows, setRowModesModel } = props;

	const handleClick = async () => {
		const newDiscipline = await axios.post(`http://localhost:5000/discipline/${props.teacherId}`, {
			name: "",
			hoursQtyFirstSemester: 0,
			hoursQtySecondSemester: 0,

			weeklyLoadSecondWeek: 0,
			weeklyLoadFirstWeek: 0,
		});

		const id = newDiscipline.data.id;
		console.log(id);

		setRows((oldRows) => {
			return [
				...oldRows,
				{
					id,
					name: "",
					hoursQtyFirstSemester: "",
					hoursQtySecondSemester: "",
					allHours: "",
					weeklyLoadSecondWeek: "",
					weeklyLoadFirstWeek: "",
					isNew: true,
				},
			];
		});
		setRowModesModel((oldModel) => {
			return {
				...oldModel,
				[id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
			};
		});
	};

	return (
		<GridToolbarContainer>
			<Button color="primary" startIcon={<ArrowBackIcon />}>
				<NavLink style={{ color: "rgb(25, 118, 210)", textDecoration: "none" }} to="/teacher">
					Назад
				</NavLink>
			</Button>
			<Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
				Добавить
			</Button>
		</GridToolbarContainer>
	);
}

export const Discipline = () => {
	const dynamicParam = useParams();
	const [teacher, setTeacher] = React.useState<TeacherType>({
		id: 0,
		name: "",
		surname: "",
		patronimyc: "",
	});
	const [rows, setRows] = React.useState(initialRows);
	const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
	const [snackbar, setSnackbar] = React.useState<Pick<AlertProps, "children" | "severity"> | null>(null);
	React.useEffect(() => {
		(async () => {
			try {
				const teacherId = dynamicParam.id;
				const disciplines = (await axios.get(`http://localhost:5000/discipline/${teacherId}`)).data;
				setRows(disciplines);
			} catch (err) {
				console.log(err);
			}
			try {
				const teacherId = dynamicParam.id;
				const teacher = (await axios.get(`http://localhost:5000/teacher/${teacherId}`)).data;
				setTeacher(teacher);
				console.log(teacher);
			} catch (err) {
				console.log(err);
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleRowEditStop: GridEventListener<"rowEditStop"> = (params, event) => {
		if (params.reason === GridRowEditStopReasons.rowFocusOut) {
			event.defaultMuiPrevented = true;
		}
	};

	const handleEditClick = (id: GridRowId) => () => {
		setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
	};

	const handleSaveClick = (id: GridRowId) => () => {
		setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
	};

	const handleDeleteClick = (id: GridRowId) => () => {
		axios.delete(`http://localhost:5000/discipline/${id}`).then(() => setRows(rows.filter((row) => row.id !== id)));
	};

	const handleCancelClick = (id: GridRowId) => () => {
		axios
			.delete(`http://localhost:5000/discipline/${id}`)
			.then(() => {
				setRowModesModel({
					...rowModesModel,
					[id]: { mode: GridRowModes.View, ignoreModifications: true },
				});

				const editedRow = rows.find((row) => row.id === id);
				if (editedRow!.isNew) {
					setRows(rows.filter((row) => row.id !== id));
				}
			})
			.catch((err) => console.log(err));
	};

	const processRowUpdate = async (newRow: GridRowModel) => {
		await axios.put(`http://localhost:5000/discipline/${newRow.id}`, newRow);
		setSnackbar({ children: "User successfully saved", severity: "success" });
		const d = (await axios.get(`http://localhost:5000/discipline/${dynamicParam.id}/${newRow.id}`)).data;
		const updatedRow = { ...d, isNew: false };
		setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
		return updatedRow;
	};

	const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
		setRowModesModel(newRowModesModel);
	};

	const handleCloseSnackbar = () => setSnackbar(null);
	const handleProcessRowUpdateError = React.useCallback((error: Error) => {
		setSnackbar({ children: error.message, severity: "error" });
	}, []);

	const columns: GridColDef[] = [
		{ field: "name", headerName: "Название предмета", width: 200, editable: true },
		{
			field: "hoursQtyFirstSemester",
			headerName: "Количество часов в первом семестре",
			type: "number",
			width: 80,
			align: "left",
			headerAlign: "left",
			editable: true,
		},
		{
			field: "hoursQtySecondSemester",
			headerName: "количество часов во втором семестре",
			type: "number",
			width: 180,
			editable: true,
		},
		{
			field: "allHours",
			headerName: "общее количество часов",
			type: "number",
			width: 180,
			editable: false,
		},
		{
			field: "weeklyLoadSecondWeek",
			headerName: "Нагрузка нечетная неделя",
			type: "number",
			width: 180,
			editable: true,
		},
		{
			field: "weeklyLoadFirstWeek",
			headerName: "Нагрузка четная неделя",
			type: "number",
			width: 180,
			editable: true,
		},

		{
			field: "actions",
			type: "actions",
			headerName: "Ред / Удаление",
			width: 100,
			cellClassName: "actions",
			getActions: ({ id }) => {
				const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

				if (isInEditMode) {
					return [
						<GridActionsCellItem
							icon={<SaveIcon />}
							label="Save"
							sx={{
								color: "primary.main",
							}}
							onClick={handleSaveClick(id)}
						/>,
						<GridActionsCellItem icon={<CancelIcon />} label="Cancel" className="textPrimary" onClick={handleCancelClick(id)} color="inherit" />,
					];
				}

				return [
					<GridActionsCellItem icon={<EditIcon />} label="Edit" className="textPrimary" onClick={handleEditClick(id)} color="inherit" />,
					<GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={handleDeleteClick(id)} color="inherit" />,
				];
			},
		},
	];

	return (
		<>
			<Header title="Дисциплины" />
			<Container>
				<TeacherItem teacher={teacher} />
				<Box
					sx={{
						height: "80vh",
						width: "100%",
						"& .actions": {
							color: "text.secondary",
						},
						"& .textPrimary": {
							color: "text.primary",
						},
					}}
				>
					<DataGrid
						rows={rows}
						columns={columns}
						editMode="row"
						rowModesModel={rowModesModel}
						onRowModesModelChange={handleRowModesModelChange}
						onRowEditStop={handleRowEditStop}
						processRowUpdate={processRowUpdate}
						onProcessRowUpdateError={handleProcessRowUpdateError}
						slots={{
							toolbar: EditToolbar,
						}}
						slotProps={{
							toolbar: { setRows, setRowModesModel, teacherId: dynamicParam.id },
						}}
					/>
					{!!snackbar && (
						<Snackbar open anchorOrigin={{ vertical: "bottom", horizontal: "center" }} onClose={handleCloseSnackbar} autoHideDuration={6000}>
							<Alert {...snackbar} onClose={handleCloseSnackbar} />
						</Snackbar>
					)}
				</Box>
			</Container>
		</>
	);
};
