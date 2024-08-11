"use client";

import { CardMovie } from "@/app/_shared/components/movie/card-movie";
import { movieHome } from "@/app/_shared/constants/data";
import { useCallback, useEffect, useState } from "react";
import { movieService } from "../../service/movie.service";

const data = [
	{
		id: "1",
		name: "Mas sobre esto",
	},
	{
		id: "2",
		name: "Informacion",
	},
	{
		id: "3",
		name: "Trailer",
	},
];

interface Props {
	params: {
		id: number;
	};
}

export default function MovieIDInformationPage({ params }: Props) {
	const [active, setActive] = useState<string>("1");

	const [dataInfo, setDataInfo] = useState<any>(null);
	const [dataMore, setDataMore] = useState<any[]>([]);

	const loadInfo = useCallback(async () => {
		const { rpta, error } = await movieService.getMovieInfoId(params.id);

		if (error) return console.log(error);

		if (rpta?.status === 200) {
			setDataInfo(rpta.data);
		}
	}, [params.id]);

	const loadMoreMovie = useCallback(async () => {
		const { rpta, error } = await movieService.getMoreMovieId(params.id);

		if (error) return console.log(error);

		if (rpta?.status === 200) {
			setDataMore(rpta.data);
		}
	}, [params.id]);

	useEffect(() => {
		(async () => {
			await loadInfo();
			await loadMoreMovie();
		})();
	}, [loadInfo, loadMoreMovie]);

	return (
		<div className="px-5 lg:px-20 pb-20">
			<div className="flex items-center">
				{data.map((el) => (
					<div
						key={el.id}
						className={`${
							active === el.id
								? "[box-shadow:inset_0px_-1px_0px_0px_#f1f3f9]"
								: ""
						} p-2 cursor-pointer`}
						onClick={() => setActive(el.id)}
					>
						<p className="text-white text-lg">{el.name}</p>
					</div>
				))}
			</div>

			{active === "1" ? (
				<div className="overflow-x-auto mt-4">
					<div className="flex gap-x-4">
						{dataMore.map((el) => (
							<CardMovie
								id={el.id}
								key={el.id}
								tag={el.tags}
								width={240}
								height={350}
								img={el.image}
								className="h-[350px] flex-shrink-0 w-[240px] cursor-pointer"
							/>
						))}
					</div>
				</div>
			) : null}
			{active === "2" ? (
				<div className="px-2">
					<div className="mt-4 space-y-4">
						<div className="">
							<p className="text-base text-white font-medium">Clasificaion</p>
							<p className="text-sm text-white">13+</p>
						</div>

						<div className="">
							<p className="text-base text-white font-medium">
								Idioma del audio
							</p>
							<p className="text-sm text-white">Español, Inglés - Original</p>
						</div>
						<div className="">
							<p className="text-base text-white font-medium">
								Protagonizado por
							</p>
							<p className="text-sm text-white">
								{dataInfo?.characters.map((el: any) => el.name).join()}
							</p>
						</div>
						<div className="">
							<p className="text-base text-white font-medium">Director</p>
							<p className="text-sm text-white">{dataInfo?.nameDirector}</p>
						</div>
					</div>
				</div>
			) : null}

			{active === "3" ? (
				<div className="px-2 mt-4">
					<p>No hay informacio para mostrar</p>
				</div>
			) : null}
		</div>
	);
}
