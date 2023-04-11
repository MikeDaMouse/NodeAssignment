import { FunctionComponent, useEffect, useState } from "react";
import Card from "../interfaces/Cards";
import { getCards } from "../services/cardService";
import Navbar from "./Navbar";

interface AllCardsProps {}

const AllCards: FunctionComponent<AllCardsProps> = () => {
	let [cards, setCards] = useState<Card[]>([]);
	useEffect(() => {
		getCards()
			.then((res) => setCards(res.data))
			.catch((err) => console.log(err));
	}, []);
	return (
		<>
			<Navbar />
			{cards.length ? (
				<div className="container ">
					<div className="row">
						{cards.map((card: Card) => (
							<div
								key={card.cardId}
								className="card  my-5 mx-4"
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

export default AllCards;
