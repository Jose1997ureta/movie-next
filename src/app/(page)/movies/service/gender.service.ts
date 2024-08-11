import { httpClient } from "@/app/_shared/service/config.service";

const getGender = async () => {
	return await httpClient({
		url: `/gender/list`,
		method: "GET",
	});
};

export const genderService = {
	getGender: getGender,
};
