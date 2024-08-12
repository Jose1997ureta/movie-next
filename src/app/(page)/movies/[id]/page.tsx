"use client";
import Image from "next/image";

import { FaPlay } from "react-icons/fa";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { movieService } from "../service/movie.service";
import { LoadingMovieId } from "../_components/loading-movie-id";

interface Props {
	params: {
		id: number;
	};
}

export default function MovieIdPage({ params }: Props) {
	const [dataInfo, setDataInfo] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(false);

	const load = useCallback(async () => {
		try {
			setLoading(true);
			const { rpta, error } = await movieService.getMovieId(params.id);

			if (error) return console.log(error);

			if (rpta?.status === 200) {
				setDataInfo(rpta.data);
			}
		} catch (error) {
		} finally {
			setLoading(false);
		}
	}, [params.id]);

	useEffect(() => {
		(async () => {
			await load();
		})();
	}, [load]);

	return (
		<div
			className="h-[600px] lg:h-[700px] relative"
			style={{
				backgroundImage: `url(${dataInfo?.banner})`,
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			<div
				className="absolute inset-0"
				style={{
					background:
						"linear-gradient(0deg, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 30%, rgba(0, 0, 0, 0) 70%), linear-gradient(0deg, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 50%), linear-gradient(90deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.25) 15%, rgba(0, 0, 0, 0) 50%)",
				}}
			/>

			<div className="absolute inset-0 bg-black/90 w-full h-full"></div>

			<div className="absolute top-1/2 -translate-y-1/2 w-full p-5  lg:p-20 flex items-start gap-x-10">
				{loading ? (
					<LoadingMovieId />
				) : (
					<>
						<div className="hidden lg:block">
							<Image
								src={dataInfo?.image}
								className=""
								alt=""
								width={350}
								height={350}
							/>
						</div>

						<div className="">
							<div className="mb-10">
								<p className="text-white text-5xl font-bold">
									{dataInfo?.title}
								</p>
								{dataInfo?.subtitle ? (
									<p className="text-white text-3xl font-medium">
										{dataInfo.subtitle}
									</p>
								) : null}
							</div>

							<div className="flex items-center gap-x-3 mb-4 ">
								<p className="text-sm text-white">2023</p>

								{dataInfo?.tags.map((el: any) => (
									<p
										key={el.id}
										className="py-0.5 px-2  rounded-full border border-white text-sm text-white"
									>
										{el.name}
									</p>
								))}

								<p className="text-sm text-white">{dataInfo?.duration}</p>
							</div>

							<p className="text-white">{dataInfo?.description}</p>

							{dataInfo?.gender ? (
								<div className="flex items-center mt-3">
									<p className="text-white mr-2">Genero:</p>
									<div className="flex gap-x-2 text-white text-sm">
										{dataInfo.gender.map((el: any) => (
											<Link
												key={el.id}
												href={`/movies?query=${el.key_gender}`}
												className="hover:underline underline-offset-4"
											>
												{el.name}
											</Link>
										))}
									</div>
								</div>
							) : null}

							<div className="flex items-center gap-x-3 mt-6">
								<button
									className="border rounded-lg px-4 py-1.5 text-neutral-900 bg-white text-base font-medium flex items-center gap-x-2 disabled:bg-slate-600 disabled:border-none disabled:cursor-not-allowed"
									disabled
								>
									<FaPlay className="w-4 h-4" /> No esta disponible por el
									momento
								</button>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
