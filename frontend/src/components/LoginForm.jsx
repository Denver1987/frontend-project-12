import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { authorize, getAuthToken, isAuthenticated } from '../utils/login.js';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthData } from '../store/slices/auth.js';
//import * as yup from 'yup';

// const validationScheme = yup.object().shape({
//   username: yup.string(),
//   password: yup.string(),
// });

const BuildLoginForm = () => {
  const navigate = useNavigate();
  const authToken = useSelector((state) => state.auth.authToken);
  const dispatch = useDispatch();
  return <Formik
    initialValues={{
      username: "",
      password: ""
    }}
    onSubmit={
      ({ username, password }, { setSubmitting }) => {
        dispatch(fetchAuthData({username, password}))
        setSubmitting(false);
        }
    }
    >
    {() => (
      <Form>
        <div className="form-group p-3">
          <label htmlFor="username">username</label>
          <Field
            type="text"
            name="username"
            className="form-control"
          />
        </div>
        <div className="form-group p-3">
          <label htmlFor="password">Password</label>
          <Field
            type="password"
            name="password"
            className="form-control"
          />
        </div>
        <div className="p-3">
          <button type="submit">Войти</button>
        </div>
      </Form>
    )}
    </Formik>
}

export const LoginForm = () => BuildLoginForm();
