import { HeaderComponent } from "@/app/_shared/components/header/header";
import { FooterComponent } from "../_shared/components/footer/footer";

interface Props {
	children: React.ReactNode;
}

export default function PageLayout({ children }: Props) {
	return (
		<div
			className="min-h-dvh bg-black grid"
			style={{
				gridTemplateRows: "auto 1fr auto",
			}}
		>
			<HeaderComponent />
			<div className="">{children}</div>
			<FooterComponent />
		</div>
	);
}
