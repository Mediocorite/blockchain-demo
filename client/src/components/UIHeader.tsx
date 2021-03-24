import {
	AppBar,
	Toolbar,
	Typography,
	makeStyles,
	Button,
} from "@material-ui/core";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

const headersData = [
	{
		label: "blockchain",
		href: "/blockchain",
	},
	{
		label: "signup",
		href: "/signup",
	},
];

const useStyles = makeStyles(() => ({
	header: {
		backgroundColor: "#f0ead6",
	},
	logo: {
		fontFamily: "'Montserrat, sans-serif",
		fontWeight: 600,
		color: "black",
		textAlign: "left",
	},
	menuButton: {
		fontFamily: "'Montserrat, sans-serif",
		fontWeight: 700,
		size: "18px",
		marginLeft: "38px",
	},
	toolbar: {
		display: "flex",
		justifyContent: "space-between",
	},
}));

export default function Header() {
	const { header, logo, menuButton, toolbar } = useStyles();

	const displayDesktop = () => {
		return (
			<Toolbar className={toolbar}>
				{blockchainLogo}
				<div>{getMenuButtons()}</div>
			</Toolbar>
		);
	};

	const blockchainLogo = (
		<Typography variant="h6" component="h1" className={logo}>
			BlockChain Demo à la Cartedo
		</Typography>
	);

	const getMenuButtons = () => {
		return headersData.map(({ label, href }) => {
			return (
				<Button
					{...{
						key: label,
						to: href,
						component: RouterLink,
						className: menuButton,
					}}
				>
					{label}
				</Button>
			);
		});
	};

	return (
		<header>
			<AppBar className={header}>{displayDesktop()}</AppBar>
		</header>
	);
}


