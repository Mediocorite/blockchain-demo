import React from "react";
import { Button } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Zoom from "@material-ui/core/Zoom";
import { Link as RouterLink } from "react-router-dom";
import { BlockChainComponent } from "./BlockChain";
import { Switch, Route } from "react-router-dom";
import SignUp from "../components/SignUp";
interface Props {
	window?: () => Window;
	children: React.ReactElement;
}

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

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			position: "fixed",
			bottom: theme.spacing(2),
			right: theme.spacing(2),
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
			backgroundColor: "#f0ead6",
			display: "flex",
			justifyContent: "space-between",
		},
	})
);

function ScrollTop(props: Props) {
	const { children, window } = props;
	const classes = useStyles();
	const trigger = useScrollTrigger({
		target: window ? window() : undefined,
		disableHysteresis: true,
		threshold: 100,
	});

	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		const anchor = (
			(event.target as HTMLDivElement).ownerDocument || document
		).querySelector("#back-to-top-anchor");
		if (anchor) {
			anchor.scrollIntoView({ behavior: "smooth", block: "center" });
		}
	};

	return (
		<Zoom in={trigger}>
			<div onClick={handleClick} role="presentation" className={classes.root}>
				{children}
			</div>
		</Zoom>
	);
}

export default function HeaderWrapper(props: any) {
	const { logo, menuButton, toolbar } = useStyles();

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
		<React.Fragment>
			<CssBaseline />
			<AppBar>
				<Toolbar className={toolbar}>
					{blockchainLogo}
					<div>{getMenuButtons()}</div>
				</Toolbar>
			</AppBar>
			<Toolbar id="back-to-top-anchor" />
			<Container>
				<Box my={2}>
					<Switch>
						<Route path="/blockchain" component={BlockChainComponent}></Route>
						<Route path="/signup" component={SignUp}></Route>
					</Switch>
				</Box>
			</Container>
			<ScrollTop {...props}>
				<Fab color="secondary" size="small" aria-label="scroll back to top">
					<KeyboardArrowUpIcon />
				</Fab>
			</ScrollTop>
		</React.Fragment>
	);
}
