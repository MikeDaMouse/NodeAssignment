import { useFormik } from "formik";
import { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import User from "../interfaces/User";

import { errorMsg, successMsg } from "../services/notifications";
import { getIsBusiness, registerNew } from "../services/usersService";
import Navbar from "./Navbar";

interface RegisterProps {}

const Register: FunctionComponent<RegisterProps> = () => {
	let navigate = useNavigate();
	let formik = useFormik({
		initialValues: { name: "", email: "", password: "", isBusiness: false },
		validationSchema: yup.object({
			name: yup.string().required().min(2),
			email: yup.string().required().email().min(8),
			password: yup.string().required().min(8),
			isBusiness: yup.boolean().required(),
		}),
		onSubmit: (values: User) => {
			registerNew({ ...values })
				.then((res) => {
					console.log(res.data);
					navigate("/");
					sessionStorage.setItem(
						"userData",
						JSON.stringify({
							isLoggedIn: true,
							token: res.data,
						})
					);
					getIsBusiness();
					successMsg("You signed up! well done!");
				})
				.catch((error) => console.log(error));
		},
	});
	return (
		<>
			<Navbar />
			<div className="container mt-3 col-md-4">
				<h2 className="display-2 text-center">REGISTER</h2>
				<form onSubmit={formik.handleSubmit}>
					<div className="form-floating mb-3">
						<input
							type="name"
							className="form-control"
							id="name"
							placeholder="Namey McName"
							name="name"
							value={formik.values.name}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
						<label htmlFor="floatingInput">Name</label>
						{formik.touched.name && formik.errors.name && (
							<small className="text-danger">{formik.errors.name}</small>
						)}
					</div>
					<div className="form-floating mb-3">
						<input
							type="email"
							className="form-control"
							id="email"
							placeholder="email@email.com"
							name="email"
							value={formik.values.email}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
						<label htmlFor="floatingInput">Email</label>
						{formik.touched.email && formik.errors.email && (
							<small className="text-danger">{formik.errors.email}</small>
						)}
					</div>
					<div className="form-floating mb-3">
						<input
							type="password"
							className="form-control"
							id="password"
							placeholder="password"
							name="password"
							value={formik.values.password}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
						<label htmlFor="floatingInput">Password</label>
						{formik.touched.password && formik.errors.password && (
							<small className="text-danger">{formik.errors.password}</small>
						)}
					</div>
					<div className="form-floating mb-3">
						<input
							type="checkbox"
							className="form-check-input"
							id="isBusiness"
							name="isBusiness"
							checked={formik.values.isBusiness}
							onChange={formik.handleChange}
						/>
						<div>
							<label htmlFor="isBusiness">
								You guys a business? its different for a business
							</label>
						</div>
					</div>
					<button
						type="submit"
						className="btn btn-primary w-100 mt-4"
						disabled={!formik.dirty || !formik.isValid}
					>
						Sign Up!
					</button>
				</form>
			</div>

			<Link to={"/login"}>
				already know what details to put in? go to the sign in page!
			</Link>
		</>
	);
};

export default Register;
