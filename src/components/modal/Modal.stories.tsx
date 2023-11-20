import { Meta } from "@storybook/react";
import { Modal } from "./Modal";
import React from "react";

const meta: Meta<typeof Modal> = {
	component: Modal,
};

export default meta;

export const DefaultModal = () => {
	const [show, setShow] = React.useState(false);

	return (
		<>
			<button onClick={() => setShow(!show)}>onShow</button>
			<Modal show={show} setShow={setShow}>
				child React Node
			</Modal>
		</>
	);
};
