import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import About from "./components/About";
import AddNewCard from "./components/AddNewCard";
import AllCards from "./components/AllCards";
import EditCard from "./components/EditCard";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import SpecialCards from "./components/SpecialCards";
import { ToastContainer } from "react-toastify";

function App() {
	return (
		<div className="App">
			<ToastContainer />
			<Router>
				<Routes>
					<Route path="/about" element={<About />} />
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/allcards" element={<AllCards />} />
					<Route path="/specialcards" element={<SpecialCards />} />
					<Route path="/addnewcard" element={<AddNewCard />} />
					<Route path="/editcard/:cardId" element={<EditCard />} />
				</Routes>
			</Router>
			<Footer />
		</div>
	);
}

export default App;
