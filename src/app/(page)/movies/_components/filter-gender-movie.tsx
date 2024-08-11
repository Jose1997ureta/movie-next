"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { movieService } from "../service/movie.service";
import { CardMovie } from "@/app/_shared/components/movie/card-movie";

export const FilterGenderMovie = () => {
	const query = useSearchParams();
	const search = query.get("query");
	const [data, setData] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	const loadMovie = useCallback(async () => {
		try {
			setLoading(true);
			let api = null;

			if (search) {
				api = movieService.filterMovieGender(search);
			} else {
				api = movieService.filterMovieDestacado();
			}

			const { rpta, error } = await api;

			if (error) return console.log(error);

			if (rpta?.status === 200) {
				setData(rpta.data);
			}
		} catch (error) {
		} finally {
			setLoading(false);
		}
	}, [search]);

	useEffect(() => {
		(async () => {
			await loadMovie();
		})();
	}, [loadMovie]);

	return (
		<div className="mt-5 ">
			<div
				className="grid gap-6"
				style={{
					gridTemplateColumns: "repeat(auto-fill, minmax(250px,1fr))",
				}}
			>
				{loading ? (
					<>
						<div className="w-[240px] h-[350px] bg-slate-50/10"></div>
						<div className="w-[240px] h-[350px] bg-slate-50/10"></div>
						<div className="w-[240px] h-[350px] bg-slate-50/10"></div>
						<div className="w-[240px] h-[350px] bg-slate-50/10"></div>
						<div className="w-[240px] h-[350px] bg-slate-50/10"></div>
						<div className="w-[240px] h-[350px] bg-slate-50/10"></div>
						<div className="w-[240px] h-[350px] bg-slate-50/10"></div>
						<div className="w-[240px] h-[350px] bg-slate-50/10"></div>
						<div className="w-[240px] h-[350px] bg-slate-50/10"></div>
						<div className="w-[240px] h-[350px] bg-slate-50/10"></div>
						<div className="w-[240px] h-[350px] bg-slate-50/10"></div>
						<div className="w-[240px] h-[350px] bg-slate-50/10"></div>
					</>
				) : data.length === 0 ? (
					<div>
						<p className="text-white">No hay informacion que mostrar</p>
					</div>
				) : (
					data.map((el) => (
						<CardMovie
							id={el.id}
							key={el.id}
							tag={el.tags}
							width={250}
							height={350}
							img={el.image}
							className="h-[350px]  w-full cursor-pointer"
						/>
					))
				)}
			</div>
		</div>
	);
};
