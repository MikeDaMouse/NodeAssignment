import { FunctionComponent } from "react";
import { successMsg } from "../services/notifications";
import { ToastContainer, toast } from "react-toastify";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
	return (
		<>
			<Navbar />

			<h3 className="display-3 text-primary">OH YEAH, IT'S BUSINESS TIME</h3>
			<img
				style={{ maxHeight: "60vh", maxWidth: "90vw" }}
				src="https://i0.wp.com/urbanasian.com/wp-content/uploads/2021/10/dinosaur2.jpg?resize=640%2C332&ssl=1"
				alt=""
			/>
		</>
	);
};

export default Home;
