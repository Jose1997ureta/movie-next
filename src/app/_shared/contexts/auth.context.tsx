"use client";

import React, { useState } from "react";
import {
	addSaveInfoProps,
	AuthProps,
	UserProps,
} from "../interfaces/auth.interface";
import { utils } from "../utils";

const initialValue: AuthProps = {
	user: null,
	token: "",
	handleSaveInfo: () => {},
};

export const AuthContext = React.createContext<AuthProps | null>(initialValue);

const userSesion = utils.sesion.getSession({ key: "auth", type: "object" });
const tokenSesion = utils.sesion.getSession({ key: "token", type: "string" });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<UserProps | null>(userSesion || null);
	const [token, setToken] = useState<string>(tokenSesion || "");

	const handleSaveInfo = (parameter: addSaveInfoProps) => {
		const { data, token } = parameter;

		const element = {
			email: data.email,
			id: data.id,
			image: data.image,
			lastName: data.lastName,
			name: data.name,
			username: data.username,
		};
		setUser(element);
		setToken(token);

		utils.sesion.setSession({ name: "token", value: token });
		utils.sesion.setSession({ name: "auth", value: element, type: "object" });

		utils.cookie.saveCookie("token", token);
	};

	const value: AuthProps = {
		user,
		token,
		handleSaveInfo,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
