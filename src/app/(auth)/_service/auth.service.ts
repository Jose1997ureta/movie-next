import { httpClient } from "@/app/_shared/service/config.service";
import { SigInProps, SigUpProps } from "../_interface/auth.interface";

const loginService = async (parameter: SigInProps) => {
	return httpClient({
		url: "/auth/signIn",
		method: "POST",
		parameter,
	});
};

const registerService = async (parameter: SigUpProps) => {
	return httpClient({
		url: "/auth/signUp",
		method: "POST",
		parameter,
	});
};

export const authService = {
	login: loginService,
	register: registerService,
};
