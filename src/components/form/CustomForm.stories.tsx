import type { Meta } from "@storybook/react";
import { CustomForm } from "./CustomForm";
import React from "react";
import { action } from "@storybook/addon-actions";
const meta: Meta<typeof CustomForm> = {
	component: CustomForm,
};

export default meta;

export const EditFormTeacher = () => {
	const editdata = {
		id: 1,
		name: "kirill",
		surname: "budanov",
		patronimyc: "denisovich",
	};
	const editCallback = action("changed teacher");
	return <CustomForm teacher={editdata} editTeachersFromCB={editCallback} />;
};

export const SetFormTeacher = () => {
	const setCallBack = action("new teacher");
	return <CustomForm setTeachersFromCB={setCallBack} />;
};
