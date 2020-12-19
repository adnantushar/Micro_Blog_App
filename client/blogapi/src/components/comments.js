import React, { useState } from 'react';
import axiosInstance from '../axios';
import { useHistory } from 'react-router-dom';
//MaterialUI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function Comments() {

	const history = useHistory();
	const initialFormData = Object.freeze({
		content: '',
	});

	const [postData, updateFormData] = useState(initialFormData);

	const handleChange = (e) => {

		if ([e.target.name] == 'title') {
			updateFormData({
				...postData,
				[e.target.name]: e.target.value.trim(),
			});
		} else {
			updateFormData({
				...postData,
				[e.target.name]: e.target.value.trim(),
			});
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		let formData = new FormData();
		formData.append('content', postData.content);
		axiosInstance.post(`/:slug/create/`, formData);
		history.push({
			pathname: '/post/${data.posts.slug}',
		});
		window.location.reload();
	};

	const classes = useStyles();

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component="h1" variant="h3">

				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>

						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="content"
								label=""
								name="content"
								autoComplete="content"
								onChange={handleChange}
								multiline
								rows={4}
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Comment
					</Button>
				</form>
			</div>
		</Container>
	);
}