import { httpClient } from "@/app/_shared/service/config.service";

const getBannerService = async () => {
	return await httpClient({
		url: "/movie/banners",
		method: "GET",
	});
};

const getGenderService = async () => {
	return await httpClient({
		url: "/gender/home",
		method: "GET",
	});
};

const getMovieGenderService = async () => {
	return await httpClient({
		url: "/movie/list/home/gender",
		method: "GET",
	});
};
const getCharacteresService = async () => {
	return await httpClient({
		url: "/character/home",
		method: "GET",
	});
};

export const homeService = {
	getBanner: getBannerService,
	getGender: getGenderService,
	getMovieGender: getMovieGenderService,
	getCharacter: getCharacteresService,
};
