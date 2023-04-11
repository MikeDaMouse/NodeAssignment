import axios from "axios";
import Card from "../interfaces/Cards";
import SpecialCards from "../interfaces/SpecialCards";
import { errorMsg } from "./notifications";

const api: string = `${process.env.REACT_APP_API}/api/cards`;
const apiSpecial = `${process.env.REACT_APP_API}/api/specialcards` || "";

//add new card
export async function addNewCard(Info: Card) {
	try {
		const response = axios.post(api, Info, {
			headers: {
				Authorization: JSON.parse(sessionStorage.getItem("userData") as string)
					.token,
			},
		});
		return response;
	} catch (error) {
		errorMsg("Error");
	}
}

//get my cards
export async function getMyCards() {
	return axios.get(apiSpecial, {
		headers: {
			Authorization: JSON.parse(sessionStorage.getItem("userData") as string)
				.token,
		},
	});
}

//Add new card to myCards
/* export async function addMyCard(cardId: number) {
	let myCardsArr: number[] = [];
	let myCardsId: number = 0;
	let userId = JSON.parse(sessionStorage.getItem("userData") as string).userId;
	try {
		let res = await axios.get(`${apiSpecial}?userId=${userId}`);
		myCardsArr = res.data[0].cards;
		myCardsId = res.data[0].cardId;
		myCardsArr.push(cardId);
		return axios.patch(`${apiSpecial}/${myCardsId}`, { cards: myCardsArr });
	} catch (error) {
		errorMsg("Error");
	}
} */
export async function deleteMyCard(cardId: string) {
	try {
		const response = await axios.delete(`${apiSpecial}/${cardId}`, {
			headers: {
				Authorization: JSON.parse(sessionStorage.getItem("userData") as string)
					.token,
			},
		});
		return response;
	} catch (error) {
		errorMsg("Error");
	}
}

//see all cards
export function getCards() {
	return axios.get(api, {
		headers: {
			Authorization: JSON.parse(sessionStorage.getItem("userData") as string)
				.token,
		},
	});
}

//get specific card
export function getSpecificCard(cardId: string) {
	return axios.get(`${api}/${cardId}`, {
		headers: {
			Authorization: JSON.parse(sessionStorage.getItem("userData") as string)
				.token,
		},
	});
}

//edit card
export function editCard(newInfo: Card) {
	return axios.put(`${api}/${newInfo.cardId}`, newInfo, {
		headers: {
			Authorization: JSON.parse(sessionStorage.getItem("userData") as string)
				.token,
		},
	});
}

//delete
export function deleteCard(cardId: string) {
	return axios.delete(`${api}/${cardId}`, {
		headers: {
			Authorization: JSON.parse(sessionStorage.getItem("userData") as string)
				.token,
		},
	});
}
