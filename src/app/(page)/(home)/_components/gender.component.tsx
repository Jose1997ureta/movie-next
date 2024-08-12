"use client";

import { getLinearGradient } from "@/app/_shared/utils/generate-color";
import { useCallback, useEffect, useState } from "react";
import { BiCameraMovie } from "react-icons/bi";
import { FaChevronRight, FaHeart, FaPlus, FaRocket } from "react-icons/fa";
import { FaMasksTheater } from "react-icons/fa6";
import { IoIosHappy } from "react-icons/io";
import { PiPoliceCarFill } from "react-icons/pi";
import { TbGhost2Filled } from "react-icons/tb";
import { homeService } from "../_service/home.service";
import { useRouter } from "next/navigation";

export const GenderHomeComponent = () => {
	const [genderData, setDataGender] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	const router = useRouter();

	const loadGender = useCallback(async () => {
		try {
			setLoading(true);
			const { rpta, error } = await homeService.getGender();

			if (error) return console.log(error);

			if (rpta?.status === 200) {
				setDataGender(rpta.data);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		(async () => {
			await loadGender();
		})();
	}, [loadGender]);

	const generateIcon = (key: string) => {
		let icon = null;
		switch (key) {
			case "comedy":
				icon = <IoIosHappy className="w-9 h-9 fill-white" />;
				break;
			case "accion":
				icon = <PiPoliceCarFill className="w-9 h-9 fill-white" />;
				break;
			case "sci-fi":
				icon = <FaRocket className="w-8 h-8 fill-white" />;
				break;
			case "terror":
				icon = <TbGhost2Filled className="w-9 h-9 fill-white" />;
				break;
			case "romance":
				icon = <FaHeart className="w-8 h-8 fill-white" />;
				break;
			case "drama":
				icon = <FaMasksTheater className="w-9 h-9 fill-white" />;
				break;
			case "documental":
				icon = <BiCameraMovie className="w-9 h-9 fill-white" />;
				break;

			default:
				break;
		}

		return icon;
	};

	const handleClick = (key: string) => {
		const search = encodeURIComponent(key);

		router.push(`/movies?query=${search}`);
	};

	const handleClickMore = () => {
		router.push(`/movies`);
	};

	return (
		<div className="mt-5 px-5 lg:px-10 py-5">
			{loading ? (
				<div
					className="grid gap-4"
					style={{
						gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
					}}
				>
					<div
						className=" rounded-md h-36 bg-slate-900/50"
						onClick={handleClickMore}
					></div>
					<div
						className=" rounded-md h-36 bg-slate-900/50"
						onClick={handleClickMore}
					></div>
					<div
						className=" rounded-md h-36 bg-slate-900/50"
						onClick={handleClickMore}
					></div>
					<div
						className=" rounded-md h-36 bg-slate-900/50"
						onClick={handleClickMore}
					></div>
				</div>
			) : genderData.length === 0 ? null : (
				<>
					<div className="flex items-center gap-x-2 cursor-pointer mb-3">
						<p className="text-white text-xl font-medium mr-1">
							Generos Populares
						</p>
						<FaChevronRight className="fill-white w-3 h-3" />
					</div>

					<div
						className="grid  gap-4"
						style={{
							gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
						}}
					>
						{genderData.map((el) => (
							<div
								key={el.id}
								className=" rounded-md h-36 flex items-center flex-col justify-center cursor-pointer"
								style={{ background: getLinearGradient(el.color1, el.color2) }}
								onClick={() => handleClick(el.key_gender)}
							>
								<div>{generateIcon(el.key)}</div>
								<p className="text-2xl text-white font-medium mt-2">
									{el.name}
								</p>
							</div>
						))}

						<div
							className=" rounded-md h-36 flex border border-white items-center flex-col justify-center cursor-pointer"
							onClick={handleClickMore}
						>
							<div>
								<FaPlus className="w-5 h-5 fill-white" />
							</div>
							<p className="text-lg text-white font-medium mt-2">Ver mas</p>
						</div>
					</div>
				</>
			)}
		</div>
	);
};
