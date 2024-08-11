"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
	href: string;
	name: string;
}

export const HeaderLink = ({ href, name }: Props) => {
	const pathaname = usePathname();

	const active =
		(pathaname === "/" && href === "/") ||
		pathaname === href ||
		pathaname.startsWith(href + "/");

	return (
		<Link
			href={href}
			className={`text-white text-base ${
				active ? "underline underline-offset-8" : ""
			}`}
		>
			{name}
		</Link>
	);
};
