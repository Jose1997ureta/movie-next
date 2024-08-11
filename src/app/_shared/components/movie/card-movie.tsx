"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { CSSProperties } from "react";
import { FaRegBookmark } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

interface Props {
	id: string;

	tag: { id: string; name: string }[];
	img: string;
	width: number;
	height: number;
	className?: string;
	style?: CSSProperties;
}

export const CardMovie = ({
	id,
	img,

	width,
	height,
	tag,
	className,
	style,
}: Props) => {
	const router = useRouter();

	const handleSearch = () => {
		router.push(`/movies/${id}`);
	};

	return (
		<div
			className={twMerge("relative", className)}
			onClick={handleSearch}
			style={style}
		>
			<Image
				src={img}
				alt=""
				width={width}
				height={height}
				className="w-full h-full"
			/>

			{/* <div className="absolute top-2 right-2 bg-black/30 p-1.5 border rounded-full z-10">
				<FaRegBookmark className="fill-white w-3.5 h-3.5" />
			</div> */}

			<div className="absolute inset-0 h-ful w-full bg-black/10 hover:bg-black/0" />
		</div>
	);
};
