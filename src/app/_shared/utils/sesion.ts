"use client";

export const setSession = ({
	name,
	type = "string",
	value,
}: {
	name: string;
	type?: "string" | "object";
	value: any;
}) => {
	try {
		if (type === "object")
			return localStorage.setItem(name, JSON.stringify(value));

		localStorage.setItem(name, value);
	} catch (error) {
		console.log(error);
	}
};

export const getSession = ({
	type = "string",
	key,
}: {
	type?: "string" | "object";
	key: string;
}) => {
	try {
		if (typeof window !== "undefined") {
			if (type === "object") {
				const result = localStorage.getItem(key);
				return result ? JSON.parse(result) : null;
			}
			return localStorage.getItem(key);
		}
	} catch (error) {
		console.log(error);
	}
};

export const deleteSessionAll = () => {
	return localStorage.clear();
};
