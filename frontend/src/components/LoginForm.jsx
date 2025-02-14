import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
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

  const formik = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    onSubmit: ({ username, password }, { setSubmitting }) => {
      dispatch(fetchAuthData({username, password}))
      setSubmitting(false);
    }
  });
  return (
    <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3 position-relative" controlId="formBasicUsername">
        <Form.Label>Имя пользователя</Form.Label>
        <Form.Control isInvalid={isAuthFailed} type="text" onChange={formik.handleChange} value={formik.values.username} name="username" placeholder="" required/>
      </Form.Group>

      <Form.Group className="mb-3 position-relative" controlId="formBasicPassword">
        <Form.Label>Пароль</Form.Label>
        <Form.Control isInvalid={isAuthFailed} type="password" onChange={formik.handleChange} value={formik.values.password} name="password" placeholder="Password" required/>
        <Form.Control.Feedback type="invalid" tooltip>
          Неверные имя пользователя или пароль
        </Form.Control.Feedback>
      </Form.Group>
      <Button type="submit">Войти</Button>
    </Form>
  );
}

export const LoginForm = () => BuildLoginForm();
