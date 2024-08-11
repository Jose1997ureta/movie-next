import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { homeService } from "../_service/home.service";

export const CharacterComponent = () => {
	const [character, setCharacter] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const load = useCallback(async () => {
		try {
			setLoading(true);

			const { rpta, error } = await homeService.getCharacter();

			if (error) return console.log(error);
			if (rpta?.status === 200) {
				setCharacter(rpta.data);
			}
		} catch (error) {
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		(async () => {
			await load();
		})();
	}, [load]);

	return (
		<div className="mt-5">
			{loading ? (
				<p className="text-white">Loading</p>
			) : character.length === 0 ? null : (
				<>
					<p className="text-white text-xl font-medium mr-1 mb-3">Actores</p>

					<div className="overflow-x-auto">
						<div className="flex gap-x-4">
							{character.map((el) => (
								<div
									key={el.id}
									className="rounded-full flex-shrink-0 flex items-center flex-col  cursor-pointer w-[200px]"
								>
									<Image
										src={el.url}
										width={150}
										height={150}
										alt=""
										className="rounded-full"
									/>
									<p className="text-base text-white font-medium mt-2 text-center">
										{el.name}
									</p>
								</div>
							))}
						</div>
					</div>
				</>
			)}
		</div>
	);
};
