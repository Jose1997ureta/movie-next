import React from "react";

export default function loading() {
	return (
		<div className="min-h-dvh flex justify-center items-center">
			<div className="flex justify-center items-center space-x-2">
				<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white-500"></div>
				<p className="text-white">Cargando...</p>
			</div>
		</div>
	);
}
