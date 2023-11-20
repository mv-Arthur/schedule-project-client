import { Meta } from "@storybook/react";

import React from "react";
import { Teachers } from "./Teachers";

const meta: Meta<typeof Teachers> = {
	component: Teachers,
};

export default meta;

export const DefaultTeachers = () => {
	return <Teachers />;
};
