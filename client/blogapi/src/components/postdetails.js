import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    cardMedia: {
        height:0,
		paddingTop: '56.25%', // 16:9
	},
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
    users: {
        marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
    },
    form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function Post() {
	const { slug } = useParams();
	const classes = useStyles();

	const [data, setData] = useState({ posts: [] });

	useEffect(() => {
		axiosInstance.get(slug).then((res) => {
			setData({ posts: res.data });
			console.log(res.data);
		});
	}, [setData]);

	const history = useHistory();
	const initialFormData = Object.freeze({
		content: '',
	});

	const [postData, updateFormData] = useState(initialFormData);

	const handleChange = (e) => {

		if ([e.target.name] === 'title') {
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
    console.log(data.posts.slug)
	const handleSubmit = (e) => {
		e.preventDefault();
		let formData = new FormData();
		formData.append('content', postData.content);
		axiosInstance.post(`/${data.posts.slug}/create/`, formData);
		history.push({
			pathname: ``,
		});
		window.location.reload();
	};
	const handleThumbsup = (e) => {
		e.preventDefault();
		const id = data.posts.id;
		console.log(id)
		axiosInstance.post(`/thumbs/`, {
          "id": id,
          "action": 'thumbsup',
        },);
		history.push({
			pathname: ``,
		});
		window.location.reload();
	};
	const handleThumbsdown = (e) => {
		e.preventDefault();
		const id = data.posts.id;
		console.log(id)
		axiosInstance.post(`/thumbs/`,{
          "id": id,
          "action": 'thumbsdown',
        },);
		history.push({
			pathname: ``,
		});
		window.location.reload();
	};


	return (
		<Container component="main" maxWidth="md">
			<CssBaseline />
			<div className={classes.paper}></div>
			<div className={classes.heroContent}>
				<Container maxWidth="md">
				    <Card className={classes.card}>
                        <CardMedia
                            className={classes.cardMedia}
                            image={data.posts.image}
                            title="Image "
                        />
                    </Card>
					<Typography
						component="h1"
						variant="h2"
						align="center"
						color="textPrimary"
						gutterBottom
					>
						{data.posts.title}
					</Typography>
					<Typography
						component="h1"
						variant="h5"
						align="center"
						color="textPrimary"
						gutterBottom
					> {console.log(data.posts.published)}
						By {data.posts.author} at
                    {data && data.posts && data.posts.published && <span> -{moment(data.posts.published).format("MMMM Do YYYY")}</span>
					 }
					</Typography>
					<div className="container">
                        <button
                        className="btn btn-success btn-large"
                        type="submit"
						fullWidth
						variant="contained"
						color="primary"
						onClick={handleThumbsup}
                         >
                            <span id="i_like_this"><span id="up">{data.posts.thumbsup}</span></span>
                            <svg id="thumbsup" width="1.5em" height="1.5em" viewBox="0 0 16 16" class="up bi bi-hand-thumbs-up"
                              fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd"
                                d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16v-1c.563 0 .901-.272 1.066-.56a.865.865 0 0 0 .121-.416c0-.12-.035-.165-.04-.17l-.354-.354.353-.354c.202-.201.407-.511.505-.804.104-.312.043-.441-.005-.488l-.353-.354.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581 0-.211-.027-.414-.075-.581-.05-.174-.111-.273-.154-.315L12.793 9l.353-.354c.353-.352.373-.713.267-1.02-.122-.35-.396-.593-.571-.652-.653-.217-1.447-.224-2.11-.164a8.907 8.907 0 0 0-1.094.171l-.014.003-.003.001a.5.5 0 0 1-.595-.643 8.34 8.34 0 0 0 .145-4.726c-.03-.111-.128-.215-.288-.255l-.262-.065c-.306-.077-.642.156-.667.518-.075 1.082-.239 2.15-.482 2.85-.174.502-.603 1.268-1.238 1.977-.637.712-1.519 1.41-2.614 1.708-.394.108-.62.396-.62.65v4.002c0 .26.22.515.553.55 1.293.137 1.936.53 2.491.868l.04.025c.27.164.495.296.776.393.277.095.63.163 1.14.163h3.5v1H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
                            </svg>

                        </button>
                        <button
                        type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className="btn btn-danger btn-large"
						onClick={handleThumbsdown}
                         >

                            <svg id="thumbsdown" width="1.5em" height="1.5em" viewBox="0 0 16 16" class="down bi bi-hand-thumbs-down"
                              fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd"
                                d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.378 1.378 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51.136.02.285.037.443.051.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.896 1.896 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.094 2.094 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.162 3.162 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28v1c.563 0 .901.272 1.066.56.086.15.121.3.121.416 0 .12-.035.165-.04.17l-.354.353.353.354c.202.202.407.512.505.805.104.312.043.44-.005.488l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.415-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.353.352.373.714.267 1.021-.122.35-.396.593-.571.651-.653.218-1.447.224-2.11.164a8.907 8.907 0 0 1-1.094-.17l-.014-.004H9.62a.5.5 0 0 0-.595.643 8.34 8.34 0 0 1 .145 4.725c-.03.112-.128.215-.288.255l-.262.066c-.306.076-.642-.156-.667-.519-.075-1.081-.239-2.15-.482-2.85-.174-.502-.603-1.267-1.238-1.977C5.597 8.926 4.715 8.23 3.62 7.93 3.226 7.823 3 7.534 3 7.28V3.279c0-.26.22-.515.553-.55 1.293-.138 1.936-.53 2.491-.869l.04-.024c.27-.165.495-.296.776-.393.277-.096.63-.163 1.14-.163h3.5v-1H8c-.605 0-1.07.08-1.466.217a4.823 4.823 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591z" />
                            </svg>
                            <span id="un_like_this"><span id="up">{data.posts.thumbsdown}</span></span>
                        </button>
                    </div>
					<Typography
						variant="h5"
						align="center"
						color="textSecondary"
						paragraph
					>
						{data.posts.content}
					</Typography>
				</Container>
				<Container component="main" maxWidth="xs">
			         <CssBaseline />
			         <Typography
						variant="h3"
						align="center"
						color="textSecondary"
						paragraph
					>
						All Comments
					</Typography>
				{data && data.posts && data.posts.comments && data.posts.comments.map((comment) =>
					 (

			                <div>
			                    <Typography
                                    variant="h5"
                                    align="center"
                                    color="textSecondary"
                                    paragraph
                                >
                                    {comment.content}
                                </Typography>
                                <Typography
                                    variant="h5"
                                    align="center"
                                    color="textSecondary"
                                    paragraph
                                >
                                   by - {comment.user} at
                                {comment && comment.publish && <span> -{moment(comment.publish).format("MMMM Do YYYY")}</span>
					 }
                                </Typography>

					        </div>
					  ))}
			    </Container>

             <Container component="main" maxWidth="xs">
			       <CssBaseline />
			    <div className={classes.paper}>
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
			</div>
		</Container>
	);
}