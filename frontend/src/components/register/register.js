import React, { Component } from 'react';
import { Button, TextField,
	Grid, Snackbar, Typography
} from '@material-ui/core';
// more components at https://material-ui.com/getting-started/usage/

import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import classes from './register.module.css';

export class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			applicant: {
				email: "",
				first_name: "",
				last_name: "",
				password: "",
				school: "",
				major: "",
				year: '6',
			},
			emailError: false,
			openAlert: false,
			// probably more, not final,
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleEmailChange = this.handleEmailChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleAlertClose = this.handleAlertClose.bind(this)
	}

	handleChange(event) { // update state on input change
		this.setState({ 
			applicant: {
				...this.state.applicant,
				[event.target.id]: event.target.value,
			}
		})
	}

	handleAlertClose() {
		this.setState({ openAlert: false })
	}

	handleSubmit(event) { // submit user state as json body
		event.preventDefault();
		const { applicant, emailError } = this.state;
		const final = applicant;
		console.log(final);

		const required = {
			email: applicant.email,
			first_name: applicant.first_name,
			last_name: applicant.last_name,
			password: applicant.password,
			school: applicant.school,
		}
		console.log(required);

		const isComplete = !Object.values(required).every(x => (x === ''));
		if (isComplete && !emailError) {
			this.props.registerUser(final);

		} else {
			this.setState({ openAlert: true })
		}

	}

	handleEmailChange(event) {
		const currEmail = event.target.value;
		const isValid = !(currEmail.includes('.cuny.edu'));
		this.setState({
			applicant: {
				...this.state.applicant,
				email: event.target.value,
			},
			emailError: isValid,
		})
	}

	render() {
		const { emailError, openAlert } = this.state;
		return (
			<div className={classes.main_div}>
				<Typography variant='h3' >
					Register
				</Typography>
				<form className={classes.main_form} onSubmit={this.handleSubmit}>
					<Grid container justify='center' >
						<Grid container item direction='column' xs='6' spacing='32' >

							<Grid container item direction='row' spacing='16' >
								<Grid item xs='6'>
									<TextField
										id='first_name' label='First' type='text'
										variant='filled' onChange={this.handleChange}
										fullWidth required
									/>
								</Grid>

								<Grid item xs='6'>
									<TextField
										id='last_name' label='Last' type='text'
										variant='filled' onChange={this.handleChange}
										fullWidth required
									/>
								</Grid>
							</Grid>

							<Grid item >
								<TextField
									id='email' label='E-mail' type='email'
									variant='filled' onChange={this.handleEmailChange}
									fullWidth required error={emailError}
								/>
							</Grid>

							<Grid item >
								<TextField
									id='password' label='Password' type='password'
									variant='filled' onChange={this.handleChange}
									fullWidth required
								/>
							</Grid>

							<Grid container item direction='row' spacing='16'>
								<Grid item xs='8'>
									<TextField
										id='school' label='School' type='text'
										variant='filled' onChange={this.handleChange}
										placeholder="eg. City College" 
										fullWidth required
									/>
								</Grid>

							<Grid item xs='4'>
								<TextField
									id='major' label='Major' type='text'
									variant='filled' onChange={this.handleChange}
									placeholder="eg. Computer Science" 
									fullWidth
								/>
							</Grid>
						</Grid>

						<Grid item>
							<Button
								type='submit'
								children="Register"
								onClick={this.handleSubmit}
								fullWidth
								color='primary'
								variant='outlined'
							/>
						</Grid>

					</Grid>
				</Grid>
				<Snackbar
					open={openAlert}
					onClose={this.handleAlertClose}
					message={<span>Incomplete Form</span>}
				/>
				</form>
			</div>
		)
	}
}

const mapStateToProps = state => {};

export default connect(mapStateToProps, { registerUser })(Register);