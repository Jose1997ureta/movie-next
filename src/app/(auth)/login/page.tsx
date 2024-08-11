"use client";

import { InputForm } from "@/app/_shared/components/form/input-form";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";

import * as Yup from "yup";
import { authService } from "../_service/auth.service";

import { useAuthContext } from "@/app/_shared/contexts";
import { useState } from "react";

export default function LoginPage() {
	const router = useRouter();
	const { handleSaveInfo } = useAuthContext();
	const [loading, setLoading] = useState<boolean>(false);

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		enableReinitialize: true,
		validationSchema: Yup.object().shape({
			email: Yup.string()
				.required("El campo es requerido")
				.email("No es un correo valido"),
			password: Yup.string().required("El campo es requerido"),
		}),

		onSubmit: () => {
			handleLogin();
		},
	});

	const handleLogin = async () => {
		setLoading(true);

		try {
			const element = {
				email: formik.values.email,
				password: formik.values.password,
			};

			const { rpta, error } = await authService.login(element);

			if (error) return console.log(error);

			if (rpta?.status === 200) {
				handleSaveInfo(rpta.data);
				router.replace("/");
			}
		} catch (error) {
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="bg-white rounded-md px-4 pb-6 pt-3 w-[400px]">
			<div className="flex justify-center mb-4">
				<p className="font-medium text-lg">INGRESAR</p>
			</div>

			<form className="space-y-3" autoComplete="off">
				<InputForm
					name="email"
					onChange={formik.handleChange}
					title="Email"
					value={formik.values.email}
					onBlur={formik.handleBlur}
					error={formik.errors.email}
					touched={formik.touched.email}
				/>
				<InputForm
					type="password"
					name="password"
					onChange={formik.handleChange}
					title="Contrasena"
					value={formik.values.password}
					onBlur={formik.handleBlur}
					error={formik.errors.password}
					touched={formik.touched.password}
				/>

				<div
					onClick={() => formik.handleSubmit()}
					className={
						"border-none bg-slate-900 text-white font-medium w-full text-sm p-2 active:scale-[.99] text-center cursor-pointer"
					}
					aria-disabled={loading}
				>
					{loading ? "Cargando" : "Ingresar"}
				</div>

				<div className="flex justify-center gap-x-2">
					<p className="text-sm text-slate-900">No tiene una cuenta?</p>
					<p
						className="text-sm underline cursor-pointer text-slate-900"
						onClick={() => router.replace("/register")}
					>
						Registrate
					</p>
				</div>
			</form>
		</div>
	);
}
