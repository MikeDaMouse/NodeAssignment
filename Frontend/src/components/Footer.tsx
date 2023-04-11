import { FunctionComponent } from "react";

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
	return (
		<>
			<footer
				style={{
					width: "100%",
					textAlign: "center",
					position: "fixed",
					bottom: "0",
					backgroundColor: "lightblue",
					borderTop: "1px",
				}}
			>
				<div>&copy; MikeDaMan 2023</div>
			</footer>
		</>
	);
};

export default Footer;
