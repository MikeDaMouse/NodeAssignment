import { FunctionComponent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { successMsg } from "../services/notifications";
import { getIsBusiness } from "../services/usersService";

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = () => {
	const userData = JSON.parse(sessionStorage.getItem("userData") as string);
	const isBusiness: Boolean = getIsBusiness() == true ? true : false;
	const isLoggedIn: Boolean = userData !== null;
	let navigate = useNavigate();
	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarCollapse"
					aria-controls="navbarCollapse"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<NavLink className="navbar-brand" to="#">
					MuhProject
				</NavLink>

				<div className="collapse navbar-collapse" id="navbarCollapse">
					<ul className="navbar-nav mr-auto mt-2 mt-lg-0">
						<li className="nav-item active">
							<NavLink className="nav-link" to="/">
								Home <span className="sr-only">(current)</span>
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="/about">
								About
							</NavLink>
						</li>
						{isLoggedIn && (
							<li className="nav-item">
								<NavLink className="nav-link" to="/allcards">
									All Cards
								</NavLink>
							</li>
						)}
						{!isLoggedIn && (
							<li className="nav-item">
								<NavLink className="nav-link" to="/login">
									Sign In!
								</NavLink>
							</li>
						)}
						{isLoggedIn && isBusiness && (
							<li className="nav-item">
								<NavLink className="nav-link" to="/specialcards">
									Special Cards
								</NavLink>
							</li>
						)}
						{isLoggedIn && isBusiness && (
							<li className="nav-item">
								<NavLink className="nav-link" to="/addnewcard">
									Add Card
								</NavLink>
							</li>
						)}
					</ul>
					<ul className="navbar-nav ms-auto">
						<form className="form-inline  my-lg-0 ml-auto">
							{isLoggedIn && (
								<button
									className="btn btn-outline-success "
									type="submit"
									onClick={() => {
										navigate("/");
										sessionStorage.removeItem("userData");
										successMsg("well thats that then");
									}}
								>
									Logout
								</button>
							)}
						</form>
					</ul>
				</div>
			</nav>
		</>
	);
};

export default Navbar;
