import Image from "next/image";

import { HeaderLink } from "./header-link";
import { HeaderProfile } from "./header-profile";

const dataUrl = [
	{
		id: "1",
		name: "Inicio",
		href: "/",
	},
	{
		id: "2",
		name: "Peliculas",
		href: "/movies",
	},
	// {
	// 	id: "3",
	// 	name: "Series",
	// 	href: "/series",
	// },
	// {
	// 	id: "4",
	// 	name: "Ninos / Familia",
	// 	href: "/family",
	// },
];

export const HeaderComponent = () => {
	return (
		<header className="h-20 px-5 lg:px-10 flex items-center justify-between  bg-black">
			{/* LOGO */}
			<div className="">
				<Image src="/hbo.png" width={60} height={60} alt="logo" />
			</div>

			<div className="flex items-center justify-center gap-x-5">
				{dataUrl.map(({ id, ...el }) => (
					<HeaderLink key={id} {...el} />
				))}
			</div>

			<HeaderProfile />
		</header>
	);
};
