import axios from "axios";

const headerConfig = {
	Accept: "application/json",
	"Content-Type": "application/json",
};

export const httpConfig = () => {
	const axiosC = axios.create({
		baseURL: "http://localhost:1234",
		headers: {
			...headerConfig,
		},
	});

	return axiosC;
};

interface httpClientProps {
	url: string;
	method: "POST" | "GET" | "DELETE" | "PUT";
	parameter?: unknown;
	header?: any;
}

export const httpClient = async ({
	method,
	parameter,
	url,
	header,
}: httpClientProps) => {
	let rpta;
	let error;

	try {
		if (method === "GET") {
			rpta = await httpConfig().get(url);
		} else if (method === "POST") {
			rpta = await httpConfig().post(url, parameter, {
				headers: {
					...header,
				},
			});
		}
	} catch (e: any) {
		// error = e?.response.data || (e?.message && { message: e.message });

		console.log(e);
	}

	console.log();

	return {
		rpta,
		error,
	};
};
