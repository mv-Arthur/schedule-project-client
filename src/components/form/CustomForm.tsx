import React from "react";
import classes from "./form.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { TeacherType } from "../../pages/teachers/Teachers";
import Button from "@mui/material/Button";
export type Inputs = {
	name: string;
	surname: string;
	patronimyc: string;
};

type CustomFormPropsType = {
	setTeachersFromCB?: (formData: Inputs) => void;
	editTeachersFromCB?: (teacherId: number, updatedData: TeacherType) => void;
	teacher?: TeacherType;
	onShow?: () => void;
};

export const CustomForm: React.FC<CustomFormPropsType> = (props: CustomFormPropsType) => {
	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors },
	} = useForm<Inputs>({
		defaultValues: {
			name: "",
			surname: "",
			patronimyc: "",
		},
	});

	React.useEffect(() => {
		if (props.teacher && props.editTeachersFromCB) {
			setValue("name", props.teacher.name);
			setValue("surname", props.teacher.surname);
			setValue("patronimyc", props.teacher.patronimyc);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		if (props.setTeachersFromCB) {
			props.setTeachersFromCB(data);
			reset();
		}
		if (props.editTeachersFromCB && props.teacher) {
			props.editTeachersFromCB(props.teacher.id, { ...data, id: props.teacher.id });
			props.onShow && props.onShow();
		}
	};

	return (
		<div className="container">
			<form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
				<TextField
					variant="outlined"
					error={Boolean(errors.surname)}
					label={errors.surname ? "поле обязательно для заполнения" : "фамилия"}
					{...register("name", { required: true })}
					{...register("surname", { required: true })}
				/>

				<TextField
					variant="outlined"
					error={Boolean(errors.name)}
					label={errors.name ? "поле обязательно для заполнения" : "имя"}
					{...register("name", { required: true })}
				/>

				<TextField
					variant="outlined"
					error={Boolean(errors.patronimyc)}
					label={errors.patronimyc ? "поле обязательно для заполнения" : "отчество"}
					{...register("patronimyc", { required: true })}
				/>

				<Button type="submit" variant="contained">
					{props.setTeachersFromCB ? "создать" : "редактировать"}
				</Button>
			</form>
		</div>
	);
};
