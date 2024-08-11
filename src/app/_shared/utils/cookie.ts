import Cookies from "js-cookie";

export const saveCookie = (key: string, value: any) => {
	// const expires = new Date();
	// expires.setTime(expires.getTime() + 60 * 60 * 1000);
	// document.cookie = `${key}=${value}; expires=${expires.toUTCString()}; path=/; secure=false;`;

	Cookies.set(key, value, {
		expires: 60 * 60 * 1000,
		sameSite: "strict",
		secure: false,
		path: "/",
	});
};

export const removeCookie = (key: string) => {
	Cookies.remove(key, { path: "" });
};
