import axios from "axios";
import User from "../interfaces/User";
import jwt_decode from "jwt-decode";
const apiLogin: string = `${process.env.REACT_APP_API}/api/login`;
const apiRegister: string = `${process.env.REACT_APP_API}/api/register`;
const apiProfile: string = `${process.env.REACT_APP_API}/api/profile`;

//Login
export function checkUser(userToCheck: User) {
	return axios.post(apiLogin, userToCheck);
}

//Register
export function registerNew(newUser: User) {
	return axios.post(apiRegister, newUser);
}

//get user details
export function getUserProfile() {
	return axios.get(apiProfile, {
		headers: {
			Authorization: JSON.parse(sessionStorage.getItem("userData") as string)
				.token,
		},
	});
}

//extract isBusiness from token
export function getIsBusiness() {
	const userData = sessionStorage.getItem("userData");
	if (!userData) {
		return false;
	}

	const parsedUserData = JSON.parse(userData);
	const token = parsedUserData && parsedUserData.token;

	if (!token) {
		return false;
	}

	return (jwt_decode(token) as any).isBusiness;
}
