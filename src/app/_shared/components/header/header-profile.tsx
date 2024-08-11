"use client";

import { FiSearch } from "react-icons/fi";
import { PiSignOutBold } from "react-icons/pi";
import { FaRegBookmark } from "react-icons/fa";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { useAuthContext } from "@/app/_shared/contexts";
import { utils } from "../../utils";
import { useState } from "react";

export const HeaderProfile = () => {
	const { user } = useAuthContext();
	const router = useRouter();

	const [show, setShow] = useState<boolean>(false);

	const handleShowForm = () => {
		router.replace("/login");
	};

	const handleCloseSesion = () => {
		utils.sesion.deleteSessionAll();
		utils.cookie.removeCookie("token");

		router.replace("/login");
	};

	return (
		<div className="flex items-center gap-x-4">
			{/* <FiSearch
				className="stroke-white w-5 h-5 cursor-pointer"
				onClick={() => alert()}
			/>
			<FaRegBookmark
				className="fill-white cursor-pointer"
				onClick={() => alert()}
			/> */}

			{user?.id ? (
				<div className="relative group cursor-pointer">
					<Image
						src={"/user.webp"}
						width={30}
						height={30}
						alt="user"
						className="rounded-full border border-white cursor-pointer"
						onClick={() => setShow((state) => !state)}
					/>

					{show ? (
						<div className="absolute top-[100%] right-0 w-[190px] h-fit  z-20">
							<div className="bg-white mt-2">
								<div className=" p-2">
									<p className="text-base text-slate-900 font-medium">
										{`${user.name} ${user.lastName}`}
									</p>
									<p className="text-xs text-slate-600">{user.username}</p>
								</div>

								<div
									className="border-t border-slate-100 flex items-center justify-between gap-x-2 p-2"
									onClick={handleCloseSesion}
								>
									<p className="text-xs text-slate-900 font-medium">
										Cerrar Sesion
									</p>
									<PiSignOutBold className="fill-slate-900 " />
								</div>
							</div>
						</div>
					) : null}
				</div>
			) : (
				<button
					className="px-2 py-1 rounded-sm bg-white border-none text-sm text-slate-900"
					onClick={handleShowForm}
				>
					Ingresar
				</button>
			)}
		</div>
	);
};
