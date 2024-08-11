"use client";

import { InputForm } from "@/app/_shared/components/form/input-form";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup";
import { authService } from "../_service/auth.service";

export default function RegisterPage() {
	const router = useRouter();
	const [loading, setLoading] = useState<boolean>(false);

	const formik = useFormik({
		initialValues: {
			name: "",
			lastName: "",
			username: "",
			email: "",
			password: "",
		},
		enableReinitialize: true,
		validationSchema: Yup.object().shape({
			name: Yup.string().required("El campo es requerido"),
			lastName: Yup.string().required("El campo es requerido"),
			username: Yup.string().required("El campo es requerido"),
			email: Yup.string()
				.required("El campo es requerido")
				.email("No es un correo valido"),
			password: Yup.string().required("El campo es requerido"),
		}),
		onSubmit: () => {
			handleRegister();
		},
	});

	const handleRegister = async () => {
		try {
			setLoading(true);

			const element = {
				name: formik.values.name,
				lastName: formik.values.lastName,
				email: formik.values.email,
				password: formik.values.password,
				username: formik.values.username,
			};

			const { rpta, error } = await authService.register(element);

			if (error) return console.log(error);

			if (rpta?.status === 201) {
				router.push("/login");
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="bg-white rounded-md px-4 pb-6 pt-3 w-[400px]">
			<div className="flex justify-center mb-4">
				<p className="font-medium text-base">INGRESAR</p>
			</div>

			<form className="space-y-3" autoComplete="off">
				<InputForm
					name="name"
					onChange={formik.handleChange}
					title="Nombres"
					value={formik.values.name}
					onBlur={formik.handleBlur}
					error={formik.errors.name}
					touched={formik.touched.name}
				/>
				<InputForm
					name="lastName"
					onChange={formik.handleChange}
					title="Apellidos"
					value={formik.values.lastName}
					onBlur={formik.handleBlur}
					error={formik.errors.lastName}
					touched={formik.touched.lastName}
				/>
				<InputForm
					name="username"
					onChange={formik.handleChange}
					title="Nombre de usuario"
					value={formik.values.username}
					onBlur={formik.handleBlur}
					error={formik.errors.username}
					touched={formik.touched.username}
				/>
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
					className="border-none bg-slate-900 text-white font-medium w-full text-sm p-2 active:scale-[.99] cursor-pointer text-center"
				>
					Registrarse
				</div>

				<div className="flex justify-center gap-x-2">
					<p className="text-sm text-slate-900">Ya tienes una cuenta?</p>
					<p
						className="text-sm underline cursor-pointer text-slate-900"
						onClick={() => router.replace("/login")}
					>
						Ingresar
					</p>
				</div>
			</form>
		</div>
	);
}
