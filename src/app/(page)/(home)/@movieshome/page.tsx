"use client";

import { MovieGroup } from "../_components/movie-group";

import { useCallback, useEffect, useState } from "react";
import { homeService } from "../_service/home.service";
import { GenderHomeComponent } from "../_components/gender.component";
import { CharacterComponent } from "../_components/character.component";

export default function MovieHomePage() {
	const [dataMovie, setDataMovie] = useState<any[]>([]);

	const loadData = useCallback(async () => {
		const { rpta, error } = await homeService.getMovieGender();

		if (error) console.log(error);

		if (rpta?.status === 200) {
			const data = rpta.data.filter((el: any) => el.movie.length > 0);
			setDataMovie(data);
		}
	}, []);

	useEffect(() => {
		(async () => {
			await loadData();
		})();
	}, [loadData]);

	return (
		<div className="px-5 lg:px-10 py-5 space-y-5">
			{dataMovie.map((el) => (
				<MovieGroup key={el.gender_key} el={el} />
			))}

			<GenderHomeComponent />

			{/* <CharacterComponent /> */}
		</div>
	);
}
