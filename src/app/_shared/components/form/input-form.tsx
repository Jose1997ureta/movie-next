import { ChangeEvent, FocusEvent } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
	type?: "text" | "password";
	name: string;
	title: string;
	value: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
	classNameContainer?: string;
	error?: string;
	touched?: boolean;
}

export const InputForm = ({
	name,
	onBlur,
	onChange,
	type = "text",
	value,
	title,
	classNameContainer,
	error,
	touched,
}: Props) => {
	return (
		<div className={twMerge(classNameContainer)}>
			<p className="text-xs text-slate-900 mb-1 font-medium">{title}</p>

			<input
				name={name}
				type={type}
				className="outline-none border border-slate-200 py-1 px-2 w-full text-slate-900 text-sm"
				onChange={onChange}
				onBlur={onBlur}
				value={value}
			/>

			{error && touched ? (
				<p className="text-red-700 mt-1 text-xs">{error}</p>
			) : null}
		</div>
	);
};
