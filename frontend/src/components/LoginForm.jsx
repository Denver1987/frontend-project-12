import { Formik, Form, Field } from 'formik';
import { Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthData } from '../store/slices/auth.js';
//import * as yup from 'yup';

// const validationScheme = yup.object().shape({
//   username: yup.string(),
//   password: yup.string(),
// });

const BuildLoginForm = () => {
  const dispatch = useDispatch();
  const isAuthFailed = useSelector((state) => state.auth.isAuthFailed);
  console.log(isAuthFailed);
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
            className={`form-control ${isAuthFailed ? "is-invalid" : ""}`}
          />
        </div>
        <div className="form-group p-3">
          <label htmlFor="password">Password</label>
          <Field
            type="password"
            name="password"
            className={`form-control ${isAuthFailed ? "is-invalid" : ""}`}
          />
        </div>
        {isAuthFailed ? <Alert variant="danger">
          Ошибка авторизации
        </Alert>: null}
        <div className="p-3">

          <button type="submit">Войти</button>
        </div>
      </Form>
    )}
    </Formik>
}

export const LoginForm = () => BuildLoginForm();
