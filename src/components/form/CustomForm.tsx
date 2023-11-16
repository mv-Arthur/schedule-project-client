import React from "react";
import classes from "./form.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { TeacherType } from "../../pages/teachers/Teachers";

type Inputs = {
	name: string;
	surname: string;
	patronimyc: string;
};

type CustomFormPropsType = {
	setTeachersFromCB?: (formData: TeacherType) => void;
	editTeachersFromCB?: (teacherId: number, updatedData: TeacherType) => void;
	teacher?: TeacherType;
	onShow?: () => void;
};

export const CustomForm = ({ setTeachersFromCB, editTeachersFromCB, teacher, ...props }: CustomFormPropsType) => {
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
		if (teacher && editTeachersFromCB) {
			setValue("name", teacher.name);
			setValue("surname", teacher.surname);
			setValue("patronimyc", teacher.patronimyc);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		if (setTeachersFromCB) {
			try {
				const fetchingData = await axios.post("http://localhost:5000/teacher", {
					...data,
				});
				delete fetchingData.data.createdAt;
				delete fetchingData.data.updatedAt;
				setTeachersFromCB(fetchingData.data);
				reset();
			} catch (err) {
				console.log(err);
			}
		}
		if (editTeachersFromCB && teacher) {
			try {
				const updatedData = await axios.put(`http://localhost:5000/teacher/${teacher.id}`, { ...data });
				editTeachersFromCB(teacher.id, { ...data, id: teacher.id });
				props.onShow && props.onShow();
				console.log(updatedData);
			} catch (err) {
				console.log(err);
			}
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
				<input type="submit" />
			</form>
		</div>
	);
};
