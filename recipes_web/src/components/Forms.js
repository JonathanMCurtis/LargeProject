import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import './styles.css';

const validateLogin = values => {
	const errors = {};

	if (!values.login)
		errors.login = 'Required';
	if (!values.password)
		errors.password = 'Required';

	return errors;
};

const validateSignUp = values => {
	const errors = {};

	if (!values.firstName)
		errors.firstName = 'Required';

	if (!values.login)
		errors.login = 'Required';
	else if (values.login.length < 3)
		errors.login = 'Must be at least 3 characters';
	else if (values.login.length > 20)
		errors.login = 'Must be less than 20 characters';
	else if (!/([A-z0-9_])*/.test(values.login))
		errors.login = 'Must only contain alphanumeric characters';

	if (!values.password)
		errors.password = 'Required';
	else if (values.password.length < 6)
		errors.password = 'Must be at least 6 characters';
	else if (values.password.length > 16)
		errors.password = 'Must be less than 16 characters';

	if (!values.email)
		errors.email = 'Email required for verification';
	else if (!/^.+@[^\.].*\.[a-z]{2,}$/.test(values.email))
		errors.email = 'Enter a valid email address';

	return errors;
};

const validateForgot = values => {
	const errors = {};

	if (!values.email)
		errors.email = 'Required';
	else if (!/^.+@[^\.].*\.[a-z]{2,}$/.test(values.email))
		errors.email = 'Enter a valid email address';

	return errors;
};

const FormComponent = ({ errors, touched, fields, active = true, buttonTitle = 'Submit' }) => {
	return (
		<Form className = 'py-3'>
			{ fields.map((row, idx) => {
				return (
					<Row key = { idx } className = 'form-group'>
						{ row.map(({ sm, key, text, ...extra }) => {
							return (
								<Col key = { key } sm = { sm } className = 'text-left'>
									<label className = { (text && 'visible font-weight-bold') || 'invisible' } htmlFor = { key }>
										{ text || 'Label' }
									</label>
									<Field
										className = { errors[key] && touched[key] ? 'text-input error' : 'text-input' }
										id = { key }
										name = { key }
										type = { extra.type || 'text' }
										readOnly = { !active }
										{ ...extra }
									/>
									<ErrorMessage render = { msg => <div className = 'error'>{ msg }</div> } name = { key } />
								</Col>
							);
						}) }
					</Row>
				);
			}) }
			{ active && <Button type = 'submit'>{ buttonTitle }</Button> }
		</Form>
	);
};

export const LoginForm = ({ onSubmit }) => {
	const history = useHistory();
	const fields = [
		[{ key: 'login', text: 'Username', placeholder: 'User' }],
		[{ key: 'password', text: 'Password', type: 'password', placeholder: 'Password' }]
	];

	return (
		<Formik
			initialValues = {{ login: '', password: '' }}
			validate = { validateLogin }
			onSubmit = { (values, { setSubmitting }) => {
				onSubmit(values).then(error => !error && history.push('/subjects'));
				setSubmitting(false);
			} }
		>
			{ ({ errors, touched }) => FormComponent({ errors, touched, fields, buttonTitle: 'Login' }) }
		</Formik>
	);
};

export const SignUpForm = ({ onSubmit }) => {
	const history = useHistory();
	const fields = [
		[{ key: 'firstName', text: 'Name', placeholder: 'First Name', sm: '5' },
		 { key: 'lastName', placeholder: 'Last Name' }],
		[{ key: 'login', text: 'Username', placeholder: 'User' }],
		[{ key: 'email', text: 'Email address', placeholder: 'Email' }],
		[{ key: 'password', text: 'Password', type: 'password', placeholder: 'Password' }]
	];

	return (
		<Formik
			initialValues = {{ firstName: '', lastName: '', login: '', email: '', password: '' }}
			validate = { validateSignUp }
			onSubmit = { (values, { setSubmitting }) => {
				onSubmit(values).then(error => !error && history.push('/subjects'));
				setSubmitting(false);
			} }
		>
			{ ({ errors, touched }) => FormComponent({ errors, touched, fields }) }
		</Formik>
	);
};

export const ForgotPasswordForm = ({ onSubmit }) => {
	const fields = [[{ key: 'email', text: 'Email address', placeholder: 'Email' }]];

	return (
		<Formik
			initialValues = {{ login: '', password: '' }}
			validate = { validateForgot }
			onSubmit = { (values, { setSubmitting }) => {
				onSubmit(values);
				setSubmitting(false);
			} }
		>
			{ ({ errors, touched }) => FormComponent({ errors, touched, fields, buttonTitle: 'Send Verification Email' }) }
		</Formik>
	);
};

export const SearchForm = ({ onSubmit }) => {
	return (
		<Formik
			initialValues = {{ search: '' }}
			onSubmit = { (values, { setSubmitting }) => {
				onSubmit(values);
				setSubmitting(false);
			} }
		>
			{ ({ touched }) => (
				<Form>
					<Field
						className = { touched.search && 'text-input' }
						id = 'search'
						name = 'search'
						type = 'text'
						placeholder = 'Search...'
					/>
				</Form>

			) }
		</Formik>
	);
};