import { useContext } from "react";
import { AuthContext } from "./auth.context";

export const useAuthContext = () => {
	const context = useContext(AuthContext);

	if (!context) throw new Error("Ha ocurrido un problema con el context");

	return context;
};
