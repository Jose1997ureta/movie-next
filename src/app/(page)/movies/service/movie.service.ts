import { httpClient } from "@/app/_shared/service/config.service";

const getMovieId = async (id: number) => {
	return await httpClient({
		url: `/movie/${id}`,
		method: "GET",
	});
};

const getMovieInfoId = async (id: number) => {
	return await httpClient({
		url: `/movie/info/${id}`,
		method: "GET",
	});
};
const getMovieInfoMoreId = async (id: number) => {
	return await httpClient({
		url: `/movie/info/more/${id}`,
		method: "GET",
	});
};

const filterMovieGender = async (gender: string) => {
	return await httpClient({
		url: `movie/filter/${gender}`,
		method: "GET",
	});
};
const filterMovieDestacado = async () => {
	return await httpClient({
		url: `movie/list/destacado`,
		method: "GET",
	});
};

export const movieService = {
	getMovieId: getMovieId,
	getMovieInfoId: getMovieInfoId,
	getMoreMovieId: getMovieInfoMoreId,
	filterMovieGender: filterMovieGender,
	filterMovieDestacado: filterMovieDestacado,
};
