"use client";
import { CardMovie } from "@/app/_shared/components/movie/card-movie";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Props {
	el: {
		name: string;
		gender_key: string;
		movie: {
			id: string;
			tags: { id: string; name: string }[];
			image: string;
		}[];
	};
}

export const MovieGroup = ({ el }: Props) => {
	const router = useRouter();
	const groupRef = useRef<HTMLDivElement>(null);

	const handleScroll = (type: "left" | "right") => {
		const element = groupRef.current;

		const valueScroll = 300;

		if (element) {
			if (type === "left") {
				element.scrollBy({ left: -valueScroll, behavior: "smooth" });
			} else if (type === "right") {
				element.scrollBy({ left: valueScroll, behavior: "smooth" });
			}
		}
	};

	const handleFilter = () => {
		const search = encodeURIComponent(el.gender_key);

		router.push(`/movies?query=${search}`);
	};

	return (
		<div className="">
			<div className="flex items-center justify-between gap-x-2 mb-3">
				<div
					className="flex items-center gap-x-2 cursor-pointer"
					onClick={handleFilter}
				>
					<p className="text-white text-xl font-medium mr-1">{el.name}</p>
					<FaChevronRight className="fill-white w-3 h-3" />
				</div>
				<div className="flex items-center gap-x-3">
					<div
						className="p-1.5 rounded-full border border-white cursor-pointer"
						onClick={() => handleScroll("left")}
					>
						<FaChevronLeft className="fill-white w-3 h-3" />
					</div>
					<div
						className="p-1.5 rounded-full border border-white cursor-pointer"
						onClick={() => handleScroll("right")}
					>
						<FaChevronRight className="fill-white w-3 h-3" />
					</div>
				</div>
			</div>

			<div className="overflow-x-auto w-full" ref={groupRef}>
				<div className="flex gap-x-4">
					{el.movie.map((el) => (
						<CardMovie
							id={el.id}
							key={el.id}
							tag={el.tags}
							width={240}
							height={350}
							img={el.image}
							className="h-[350px] flex-shrink-0 cursor-pointer"
						/>
					))}
				</div>
			</div>
		</div>
	);
};
