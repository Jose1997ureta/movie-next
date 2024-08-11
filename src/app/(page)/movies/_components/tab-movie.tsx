"use client";

import { useState } from "react";

const data = [
	{
		id: "1",
		name: "Mas sobre esto",
	},
	{
		id: "2",
		name: "Informacion",
	},
];
export const TabMovie = () => {
	const [active, setActive] = useState<string>("1");

	return (
		<div className="px-20">
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
						<p className="text-white">{el.name}</p>
					</div>
				))}
			</div>
		</div>
	);
};
