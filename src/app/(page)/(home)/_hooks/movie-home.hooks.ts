import { useState } from "react";

export const useMovieHome = () => {
	const [moviesHome, setMoviesHome] = useState<any[]>([]);

	return {
		moviesHome,
	};
};
