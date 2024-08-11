interface Props {
	children: React.ReactNode;
}

export default function AuthLayout({ children }: Props) {
	return (
		<div className="min-h-dvh bg-slate-950 flex justify-center items-center w-full">
			{children}
		</div>
	);
}
