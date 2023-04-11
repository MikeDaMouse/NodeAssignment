import axios from "axios";
import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../interfaces/Cards";
import {
	deleteCard,
	deleteMyCard,
	editCard,
	getMyCards,
} from "../services/cardService";
import { successMsg } from "../services/notifications";
import Navbar from "./Navbar";

interface SpecialCardsProps {}

const SpecialCards: FunctionComponent<SpecialCardsProps> = () => {
	let navigate = useNavigate();
	let [cards, setCards] = useState<Card[]>([]);
	let [cardChange, setCardChange] = useState<boolean>(false);

	useEffect(() => {
		const fetchCards = async () => {
			const response = await getMyCards();
			setCards(response.data);
		};
		fetchCards();
	}, [cardChange]);

	let refresh = () => {
		setCardChange(!cardChange);
	};

	return (
		<>
			<Navbar />
			{cards.length ? (
				<div className="container">
					<div className="row">
						{cards.map((card: Card) => (
							<div
								key={card.cardId}
								className="card ms-1 my-5 mx-4"
								style={{ width: "18rem" }}
							>
								<img
									src={card.image}
									style={{ width: "100%", height: "15rem" }}
									alt=""
								/>

								<div className="card-body">
									<h3 className="card-title">{card.name}</h3>
									<p className="card-text" style={{ fontSize: "1.3rem" }}>
										{card.description}
									</p>
									<hr />
									<p className="card-text">{card.location}</p>
									<hr />
									<p className="card-text">{card.phone}</p>

									<button
										className="btn btn-warning mx-2"
										onClick={() => {
											navigate(`/editcard/${card.cardId}`);
										}}
									>
										<i className="fa-solid fa-pen-to-square"></i>
									</button>
									<button
										className="btn btn-danger"
										onClick={() => {
											if (
												window.confirm(
													"Are you sure you want to delete this card?"
												)
											) {
												if (card.cardId !== undefined) {
													deleteCard(card.cardId).then(() => {
														if (card.cardId !== undefined) {
															deleteMyCard(card.cardId).then(() => {
																successMsg("Card deleted");
																refresh();
															});
														}
													});
												}
											}
										}}
									>
										<i className="fa-solid fa-trash"></i>
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
			) : (
				<p>Nothing to show for yourself</p>
			)}
		</>
	);
};

export default SpecialCards;
