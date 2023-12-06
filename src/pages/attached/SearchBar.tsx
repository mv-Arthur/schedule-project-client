import React from "react";
import TextField from "@mui/material/TextField";
export const SearchBar = (props: { onSearch: (value: string) => void }) => {
	const [inputValue, setInputValue] = React.useState("");
	React.useEffect(() => {
		props.onSearch(inputValue);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inputValue]);
	return (
		<TextField
			value={inputValue}
			onChange={(e) => setInputValue(e.currentTarget.value)}
			id="standard-basic"
			label="Найти..."
			variant="standard"
			helperText="введите наименование дисциплины"
		/>
	);
};
