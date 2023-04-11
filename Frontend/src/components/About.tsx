import { FunctionComponent } from "react";
import Navbar from "./Navbar";

interface AboutProps {}

const About: FunctionComponent<AboutProps> = () => {
	return (
		<>
			<Navbar />
			<div className="container">
				<div className="row">
					<div className="col">
						<img
							style={{ width: "500px", height: "600px" }}
							src="https://i.kym-cdn.com/photos/images/newsfeed/001/125/992/944.jpg"
							alt=""
						/>
					</div>
					<div className="col my-5">
						<h3 className="display-3">JUST WHAT IS GOING ON HERE?</h3>
						<p>
							I find myself caught between a simulation of a working website and
							the knowledge that it is nothing more than an assignment to see
							what I know about React. Therefore you, my dear reviewer, will
							notice that I vacillate between business cards and pictures of
							bananas and dinosaurs.
						</p>
						<p>
							But truly, how can any website escape its own self awareness? How
							does the artist separate herself from the art in its creation?
							Actually, it is possible to avoid this, simply ignore the endless
							meta-cognitive tower constantly being erected as we live and
							dream.
						</p>
						<p>Alas</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default About;
