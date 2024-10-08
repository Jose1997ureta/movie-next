"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { genderService } from "../service/gender.service";

export const ListGenderMovie = () => {
	const router = useRouter();
	const query = useSearchParams();
	const [loading, setLoading] = useState<boolean>(false);
	const [data, setData] = useState<any[]>([]);

	const search = query.get("query");

	const loadGender = useCallback(async () => {
		try {
			setLoading(true);
			const { rpta, error } = await genderService.getGender();

			if (error) return console.log(error);

			if (rpta?.status === 200) {
				setData([
					{ id: "-1", name: "Destacados", key_gender: "" },
					...rpta.data,
				]);
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

	const handleFilter = (key: string) => {
		const search = encodeURIComponent(key);
		router.replace(`/movies?query=${search}`, { scroll: false });
	};

	const isActive = useCallback(
		(key: string) => {
			if (!search || search === "") return "";

			if (search === key) return key;
		},
		[search]
	);

	return (
		<div className="flex flex-wrap items-center gap-3">
			{loading ? (
				<>
					<div className="bg-slate-900/50 rounded-2xl py-1 px-5 cursor-pointer flex-shrink-0 w-[100px] h-[34px]"></div>
					<div className="bg-slate-900/50 rounded-2xl py-1 px-5 cursor-pointer flex-shrink-0 w-[100px] h-[34px]"></div>
					<div className="bg-slate-900/50 rounded-2xl py-1 px-5 cursor-pointer flex-shrink-0 w-[100px] h-[34px]"></div>
					<div className="bg-slate-900/50 rounded-2xl py-1 px-5 cursor-pointer flex-shrink-0 w-[100px] h-[34px]"></div>
					<div className="bg-slate-900/50 rounded-2xl py-1 px-5 cursor-pointer flex-shrink-0 w-[100px] h-[34px]"></div>
					<div className="bg-slate-900/50 rounded-2xl py-1 px-5 cursor-pointer flex-shrink-0 w-[100px] h-[34px]"></div>
					<div className="bg-slate-900/50 rounded-2xl py-1 px-5 cursor-pointer flex-shrink-0 w-[100px] h-[34px]"></div>
				</>
			) : (
				data.map((el) => (
					<div
						key={el.id}
						className={`border border-white rounded-2xl py-1 px-5 cursor-pointer flex-shrink-0 ${
							isActive(el.key_gender) === el.key_gender ? "bg-white" : ""
						}`}
						onClick={() => handleFilter(el.key_gender)}
					>
						<p
							className={`text-base  ${
								isActive(el.key_gender) === el.key_gender
									? "font-medium text-slate-900"
									: "text-white"
							}`}
						>
							{el.name}
						</p>
					</div>
				))
			)}
		</div>
	);
};
