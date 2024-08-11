"use client";
interface Props {
	children: React.ReactNode;
	information: React.ReactNode;
}

export default function MovieIdLayout({ children, information }: Props) {
	return (
		<div>
			{children}

			{information}
		</div>
	);
}
