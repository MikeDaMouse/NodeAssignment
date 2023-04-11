import { useFormik } from "formik";
import { FunctionComponent } from "react";

import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import User from "../interfaces/User";
import { errorMsg, successMsg } from "../services/notifications";
import { checkUser } from "../services/usersService";
import Navbar from "./Navbar";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
	let navigate = useNavigate();
	let formik = useFormik({
		initialValues: { email: "", password: "" },
		validationSchema: yup.object({
			email: yup.string().required().email().min(8),
			password: yup.string().required().min(8),
		}),
		onSubmit: (values: User) => {
			checkUser(values)
				.then((res) => {
					navigate("/");
					successMsg("Congrats! Login Sucessful!");
					sessionStorage.setItem(
						"userData",
						JSON.stringify({ isLoggedIn: true, token: res.data })
					);
				})
				.catch((err) => errorMsg("Wrong email or Password"));
		},
	});
	return (
		<>
			<Navbar />
			<div className="container">
				<div className="row">
					<div className="col">
						<img
							src="https://2.bp.blogspot.com/-flPha3ZGuYU/WoiKrLP2OAI/AAAAAAAACE8/cHjHwY_i8XM4i8eTY8qtGghEMG7TbE_5gCLcBGAs/s1600/download%2B%252845%2529.jpg"
							alt=""
						/>
						<img
							style={{ width: "200px", height: "240px" }}
							src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Daniel_Dennett_in_Venice_2006.png"
							alt=""
						/>
						<p>
							Random, but pretty crazy how similar Daniel Dennett looks like
							Rabbi Leon of Modena
						</p>
					</div>
					<div className="container mt-3 col">
						<h2 className="display-2 text-center">SIGN IN</h2>
						<form onSubmit={formik.handleSubmit}>
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
									<small className="text-danger">
										{formik.errors.password}
									</small>
								)}
							</div>
							<button
								type="submit"
								className="btn btn-primary w-100 mt-3"
								disabled={!formik.dirty || !formik.isValid}
							>
								Sign In
							</button>
						</form>
						<Link to={"/register"}>
							dont have access to my mongoDB compass? Wouldnt help i encrypted
							the password mwahahaha!! You can just add your own!
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
