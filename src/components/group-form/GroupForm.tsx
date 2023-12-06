import React from "react";
import TextField from "@mui/material/TextField";
import classes from "./group-from.module.css";
import Button from "@mui/material/Button";
import { SubmitHandler, useForm } from "react-hook-form";

import { GroupType, groupCreationAttrs } from "../../pages/group/Group";
export type Inputs = {
	groupNumber: string;
	numberOfCourse: number;
	nameOfSpec: string;
};

type GroupFormPropsType = {
	addGroup?: (newGroup: groupCreationAttrs) => void;
	editGroup?: (modifyGroup: GroupType) => void;
	group?: GroupType;
	setShow?: React.Dispatch<React.SetStateAction<boolean>>;
	onSearch?: (value: string) => void;
};
export const GroupForm: React.FC<GroupFormPropsType> = (props: GroupFormPropsType) => {
	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors },
	} = useForm<Inputs>({
		defaultValues: {
			groupNumber: "",
			numberOfCourse: 1,
			nameOfSpec: "",
		},
	});
	const [inputValue, setInputValue] = React.useState("");
	React.useEffect(() => {
		if (props.onSearch) {
			props.onSearch(inputValue);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inputValue]);

	React.useEffect(() => {
		if (props.editGroup && props.group) {
			setValue("groupNumber", props.group.groupNumber);
			setValue("numberOfCourse", props.group.numberOfCourse);
			setValue("nameOfSpec", props.group.nameOfSpec);
			console.log(props.group);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		if (props.addGroup) {
			props.addGroup(data);
			reset();
		}
		if (props.editGroup && props.group && props.setShow) {
			const modify = { ...props.group, ...data };
			props.editGroup(modify);
			props.setShow(false);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
			<TextField
				error={Boolean(errors.groupNumber)}
				{...register("groupNumber", { required: true })}
				id="outlined-basic"
				label={errors.groupNumber ? "поле обязательное для заполнения" : "Номер группы"}
				variant="outlined"
			/>
			<TextField
				error={Boolean(errors.numberOfCourse)}
				{...register("numberOfCourse", { min: 1, max: 4 })}
				id="standard-select-currency"
				type="number"
				label={errors.numberOfCourse ? "неверное значение" : "курс"}
				variant="outlined"
			></TextField>
			<TextField
				error={Boolean(errors.nameOfSpec)}
				{...register("nameOfSpec", { required: true })}
				id="outlined-basic"
				label={errors.nameOfSpec ? "поле обязательное для заполнения" : "Наименование специальности"}
				variant="outlined"
			/>

			<Button type="submit" variant="contained">
				{props.editGroup ? "редактировать" : "добавить"}
			</Button>
			{!props.editGroup && (
				<TextField
					value={inputValue}
					onChange={(e) => setInputValue(e.currentTarget.value)}
					id="standard-basic"
					label="Найти..."
					variant="standard"
					helperText="введите номер группы"
				/>
			)}
		</form>
	);
};
