import { Meta } from "@storybook/react";
import { TeacherItem } from "./TeacherItem";
import { TeacherType } from "../../pages/teachers/Teachers";
import { action } from "@storybook/addon-actions";
const meta: Meta<typeof TeacherItem> = {
	component: TeacherItem,
};
export default meta;
export const DefaultTeacherItem = () => {
	const teacher: TeacherType = {
		id: 1,
		name: "Vladislav",
		surname: "Ivanov",
		patronimyc: "Nikolayevich",
	};

	const deleteTeacherCB = action("Deleted");
	const editTeacherCB = action("Changed");
	return <TeacherItem teacher={teacher} deleteTeacherCB={deleteTeacherCB} editTeacherCB={editTeacherCB} />;
};
