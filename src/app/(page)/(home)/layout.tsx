interface Props {
	children: React.ReactNode;
	movieshome: React.ReactNode;
}

export default function HomeLayout({ children, movieshome }: Props) {
	return (
		<div className="min-h-dvh bg-black">
			{children}

			{/* MOVIES */}

			{movieshome}
		</div>
	);
}
