import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { authorize, getAuthToken } from '../utils/login.js';
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
  const dispatch = useDispatch();
  return <Formik
    initialValues={{
      username: "",
      password: ""
    }}
    onSubmit={
      ({ username, password }, { setSubmitting }) => {
        axios.post('api/v1/login', { username: username, password: password}).then((response) => {
          console.log(response.data);
          authorize(response.data);
          navigate('/');
          dispatch(fetchAuthData(username, password))
        });
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
