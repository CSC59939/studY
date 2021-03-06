import React from 'react';
import { TextField } from '@material-ui/core';
// more components at https://material-ui.com/getting-started/usage/
import { withFormik, Field, Form } from 'formik';
import * as Yup from 'yup';
import propTypes from 'prop-types';
import { loginUser } from '../../fetches';
import classes from './login.module.css';
import icon from '../../images/icon.png';

const inputField = ({
  input, ...rest
}) => (
  <TextField
    InputProps={{ className: classes.TextField }}
    variant="outlined"
    {...input}
    margin="dense"
    fullWidth
    {...rest}
  />
);

export const Login = (props) => {
  const {
    handleChange,
    errors,
    touched,
    isSubmitting,
  } = props;

  return (
    <div className={classes.Container}>
      <div className={classes.PageColumns}>
        <div className={classes.PageColumn_left}>
          <div className={classes.Art} />
        </div>
        <div className={classes.PageColumn_right}>
          <div className={classes.ColumnContainer}>
            <div>
              <img alt="icon" src={icon} className={classes.Icon} />
            </div>

            <h1 className={classes.Title}>Sign In</h1>
            <Form name="loginForm" id="myForm" className={classes.Form} >
              <Field
                name="email"
                id="email"
                label="Email"
                type="email"
                helperText={touched.email && errors.email && <p>{errors.email}</p>}
                onBlur={handleChange}
                component={inputField}
              />

              <Field
                name="password"
                id="password"
                label="Password"
                type="password"
                helperText={touched.password && errors.password && <p>{errors.password}</p>}
                onBlur={handleChange}
                component={inputField}
              />
              {errors.loginForm && <span>{errors.loginForm}</span>}

              <div>
                <button type="submit" disabled={isSubmitting} className={classes.Submit}>
                  SIGN IN
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  handleChange: propTypes.func.isRequired,
  errors: propTypes.array,
  touched: propTypes.bool,
  isSubmitting: propTypes.func.isRequired,
};

Login.defaultProps = {
  errors: [],
  touched: false,
};

export default withFormik({
  mapPropsToValues: () => ({
    email: '',
    password: '',
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .matches(/(.cuny.edu)/, 'Must be a valid CUNY Email')
      .required('Email is required'),
    password: Yup.string().required(),
  }),
  handleSubmit: (user, { props, setErrors, setSubmitting }) => {
    loginUser(user).then((result) => {
      props.onLogin(result.token);
    })// .then(() => props.history.push('/'))
      .catch((error) => {
        setErrors({ loginForm: error.message });
        setSubmitting(false);
      });
  },
})(Login);
