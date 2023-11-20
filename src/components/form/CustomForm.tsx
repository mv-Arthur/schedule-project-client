import React from "react";
import classes from "./form.module.css";
import { useForm, SubmitHandler } from "react-hook-form";

import { TeacherType } from "../../pages/teachers/Teachers";

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
				<input type="text" placeholder="фамилия" {...register("surname", { required: true })} />
				{errors.surname && <span>поле обязательно для заполнения</span>}
				<input type="text" placeholder="имя" {...register("name", { required: true })} />
				{errors.name && <span>поле обязательно для заполнения</span>}

				<input type="text" placeholder="отчество" {...register("patronimyc", { required: true })} />
				{errors.patronimyc && <span>поле обязательно для заполнения</span>}
				<input type="submit" value={props.setTeachersFromCB ? "отправить" : "редактировать"} />
			</form>
		</div>
	);
};
