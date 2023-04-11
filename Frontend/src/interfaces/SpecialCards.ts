import Card from "./Cards";

export default interface SpecialCards {
	id?: string;
	userId: string;
	cards: Card[];
	active: boolean;
}
