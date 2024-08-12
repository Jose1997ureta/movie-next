"use client";

import { MovieGroup } from "../_components/movie-group";

import { useCallback, useEffect, useState } from "react";
import { homeService } from "../_service/home.service";
import { GenderHomeComponent } from "../_components/gender.component";

export default function MovieHomePage() {
	const [dataMovie, setDataMovie] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	const loadData = useCallback(async () => {
		try {
			setLoading(true);

			const { rpta, error } = await homeService.getMovieGender();

			if (error) console.log(error);

			if (rpta?.status === 200) {
				const data = rpta.data.filter((el: any) => el.movie.length > 0);
				setDataMovie(data);
			}
		} catch (error) {
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		(async () => {
			await loadData();
		})();
	}, [loadData]);

	return (
		<>
			<div className="px-5 lg:px-10 py-5">
				<div className="space-y-5">
					{loading ? (
						<div className="overflow-x-auto">
							<div className="flex gap-x-4">
								<div className="flex-shrink-0 flex-grow-0 basis-[240px] h-[350px] bg-slate-900/50"></div>
								<div className="flex-shrink-0 flex-grow-0 basis-[240px] h-[350px] bg-slate-900/50"></div>
								<div className="flex-shrink-0 flex-grow-0 basis-[240px] h-[350px] bg-slate-900/50"></div>
								<div className="flex-shrink-0 flex-grow-0 basis-[240px] h-[350px] bg-slate-900/50"></div>
								<div className="flex-shrink-0 flex-grow-0 basis-[240px] h-[350px] bg-slate-900/50"></div>
								<div className="flex-shrink-0 flex-grow-0 basis-[240px] h-[350px] bg-slate-900/50"></div>
								<div className="flex-shrink-0 flex-grow-0 basis-[240px] h-[350px] bg-slate-900/50"></div>
							</div>
						</div>
					) : (
						dataMovie.map((el) => <MovieGroup key={el.gender_key} el={el} />)
					)}
				</div>
			</div>

			<GenderHomeComponent />
		</>
	);
}
