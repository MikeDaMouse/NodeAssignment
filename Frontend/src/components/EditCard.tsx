import { useFormik } from "formik";
import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import Card from "../interfaces/Cards";
import { editCard } from "../services/cardService";
import { errorMsg, successMsg } from "../services/notifications";
import { getSpecificCard } from "../services/cardService";
import Navbar from "./Navbar";

interface EditCardProps {}

const EditCard: FunctionComponent<EditCardProps> = () => {
	const cardId = useParams().cardId || "";

	let [card, setCard] = useState<Card>({
		name: "",
		description: "",
		location: "",
		phone: "",
		image: "",
	});
	useEffect(() => {
		getSpecificCard(cardId)
			.then((res) => setCard(res.data))
			.catch((err) => console.log(err));
	}, [cardId]);
	let navigate = useNavigate();
	let formik = useFormik({
		initialValues: {
			name: card.name,
			description: card.description,
			location: card.location,
			phone: card.phone,
			image: card.image,
		},
		enableReinitialize: true, // Add this line to update the form when the `card` state changes
		validationSchema: yup.object({
			name: yup.string().required().min(2),
			description: yup.string().required().min(5),
			location: yup.string().required().min(5),
			phone: yup
				.string()
				.required()
				.matches(/^[0-9]+$/)
				.min(10),
			image: yup.string().required().min(2),
		}),
		onSubmit: (values: Card) => {
			editCard({ ...values, cardId: cardId })
				.then(() => {
					successMsg("Card updated");
					navigate("/specialcards");
				})
				.catch((err) => errorMsg(err));
		},
	});
	return (
		<>
			<Navbar />
			<h3 className="header">Update Card</h3>
			<div className="container mt-3 text-center col-md-4">
				<form onSubmit={formik.handleSubmit}>
					<div className="form-floating mb-3">
						<input
							type="text"
							className="form-control"
							id="nameInput"
							placeholder="Name of da ting"
							name="name"
							onChange={formik.handleChange}
							value={formik.values.name}
							onBlur={formik.handleBlur}
						/>
						<label htmlFor="nameInput">Name</label>
						{formik.touched.name && formik.errors.name && (
							<p className="text-danger">{formik.errors.name}</p>
						)}
					</div>
					<div className="form-floating mb-3">
						<input
							type="text"
							className="form-control"
							id="descInput"
							placeholder="Description"
							name="description"
							onChange={formik.handleChange}
							value={formik.values.description}
							onBlur={formik.handleBlur}
						/>
						<label htmlFor="descInput">Description</label>
						{formik.touched.description && formik.errors.description && (
							<p className="text-danger">{formik.errors.description}</p>
						)}
					</div>
					<div className="form-floating mb-3">
						<input
							type="text"
							className="form-control"
							id="locationInput"
							placeholder="where would I go about finding it?"
							name="location"
							onChange={formik.handleChange}
							value={formik.values.location}
							onBlur={formik.handleBlur}
						/>
						<label htmlFor="locationInput">Location</label>
						{formik.touched.location && formik.errors.location && (
							<p className="text-danger">{formik.errors.location}</p>
						)}
					</div>
					<div className="form-floating mb-3">
						<input
							type="text"
							className="form-control"
							id="phoneInput"
							placeholder="phone nuimage"
							name="phone"
							onChange={formik.handleChange}
							value={formik.values.phone}
							onBlur={formik.handleBlur}
						/>
						<label htmlFor="phoneInput">Phone</label>
						{formik.touched.phone && formik.errors.phone && (
							<p className="text-danger">{formik.errors.phone}</p>
						)}
					</div>
					<div className="form-floating mb-3">
						<input
							type="text"
							className="form-control"
							id="imageInput"
							placeholder="Image Link"
							name="image"
							onChange={formik.handleChange}
							value={formik.values.image}
							onBlur={formik.handleBlur}
						/>
						<label htmlFor="imageInput">Image</label>
						{formik.touched.image && formik.errors.image && (
							<p className="text-danger">{formik.errors.image}</p>
						)}
					</div>
					<button
						type="submit"
						className="btn btn-success w-100 my-3"
						disabled={!formik.dirty || !formik.isValid}
					>
						Update Card
					</button>
				</form>
			</div>
		</>
	);
};

export default EditCard;
