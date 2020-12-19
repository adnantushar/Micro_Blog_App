import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({

	footer: {
		borderTop: `1px solid ${theme.palette.divider}`,
		marginTop: theme.spacing(8),
		paddingTop: theme.spacing(3),
		paddingBottom: theme.spacing(3),
		[theme.breakpoints.up('sm')]: {
			paddingTop: theme.spacing(6),
			paddingBottom: theme.spacing(6),
		},
	},
}));

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Created By '}
			<Link color="inherit" href="sbislamtushar@gmail.com">
				S B Islam Tushar
			</Link>{' '}

			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/></svg>
			{' sbislamtushar@gmail.com'}
		</Typography>
	);
}


function Footer() {
	const classes = useStyles();
	return (
		<React.Fragment>
			<Container maxWidth="md" component="footer" className={classes.footer}>
				<Box mt={2}>
					<Copyright />
				</Box>
			</Container>
		</React.Fragment>
	);
}

export default Footer;
