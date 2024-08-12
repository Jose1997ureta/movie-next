"use client";

import React, { useCallback, useEffect, useState } from "react";

import { homeService } from "./_service/home.service";
import { FaPlay } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function BannerPage() {
	const router = useRouter();
	const [dataBanner, setDataBanner] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	const handleShowMovie = (id: number) => {
		router.push(`/movies/${id}`);
	};

	const loadBanner = useCallback(async () => {
		try {
			setLoading(true);
			const { rpta, error } = await homeService.getBanner();

			if (error) console.log(error);
			if (rpta?.status === 200) {
				setDataBanner(rpta.data);
			}
		} catch (error) {
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		loadBanner();
	}, [loadBanner]);

	return (
		<div className="h-[600px] lg:h-[700px] relative">
			{loading ? (
				<div className="h-full w-full bg-slate-900/10"></div>
			) : (
				dataBanner.map((el) => (
					<div
						key={el.id}
						className="h-full w-full"
						style={{
							backgroundImage: `url(${el.banner})`,
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

						<div className="absolute left-5 lg:left-10  top-1/2  lg:bottom-[44px] w-11/12 lg:w-2/5">
							<div className="mb-10">
								<p className="text-white text-5xl font-bold">{el.title}</p>
								{el.subtitle ? (
									<p className="text-white text-3xl font-medium">
										{el.subtitle}
									</p>
								) : null}
							</div>

							<div className="flex items-center gap-x-3 mb-4 ">
								<p className="text-sm text-white">2023</p>

								{el.tags.map((t: any) => (
									<p
										key={t.id}
										className="py-0.5 px-2  rounded-full border border-white text-sm text-white"
									>
										{t.name}
									</p>
								))}

								<p className="text-sm text-white">{el.duration}</p>
							</div>

							<p className="text-white">{el.description}</p>

							<div className="flex items-center gap-x-3 mt-6">
								<button
									className="border rounded-lg px-4 py-1.5 text-neutral-900 bg-white text-base font-medium flex items-center gap-x-2"
									onClick={() => handleShowMovie(el.id)}
								>
									<FaPlay className="w-4 h-4" /> Ir a la pelicula
								</button>

								{/* <button className="rounded-full  p-2  border border-white">
								<FaRegBookmark className="fill-white w-4 h-4" />
							</button> */}
							</div>
						</div>
					</div>
				))
			)}
		</div>
	);
}
