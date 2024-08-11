import Link from "next/link";

import { FaLinkedin, FaGithub } from "react-icons/fa";

export const FooterComponent = () => {
	return (
		<div className="h-[60px] px-5 py-5 lg:px-10 border-t border-slate-800">
			<div className="flex justify-center items-center gap-x-2">
				<p className="text-white">Jose Ureta - </p>
				<Link
					href={"https://www.linkedin.com/in/jos%C3%A9-antonio-ureta-chipana/"}
					target="_blank"
				>
					<FaLinkedin className="w-5 h-5" />
				</Link>
				<Link href={"https://github.com/Jose1997ureta"} target="_blank">
					<FaGithub className="w-5 h-5" />
				</Link>
			</div>
		</div>
	);
};
