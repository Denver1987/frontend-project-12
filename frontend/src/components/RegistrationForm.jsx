import { useFormik } from 'formik';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import * as yup from 'yup';
import { authorize } from '../utils/login';
import { useNavigate } from 'react-router-dom';

const BuildRegistrationForm = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirm: ''
    },
    validationSchema: yup.object({
        username: yup.string()
        .min(3, 'Имя пользователя должно содержать от 3 до 20 символов')
        .max(20, 'Имя пользователя должно содержать от 3 до 20 символов'),
        password: yup.string().min(6, 'Пароль должен содержать не менее 6 символов'),
        confirm: yup.string().oneOf([yup.ref('password')], 'Пароли должны совпадать'),
      }),
      onSubmit: (values) => {
        console.log(values);
        axios.post('/api/v1/signup', { username: values.username, password: values.password }).then((response) => {
          console.log(response.status);
          authorize(response.data);
          navigate('/');
        }).catch((response) => {
          console.log(response.status)
        });
      }
  });
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Имя пользователя</Form.Label>
        <Form.Control type="text" onChange={formik.handleChange} value={formik.values.username} name="username" placeholder="" />
        {formik.touched.username && formik.errors.username ?
            <Alert variant="danger">{formik.errors.username}</Alert> : null}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Пароль</Form.Label>
        <Form.Control type="password" onChange={formik.handleChange} value={formik.values.password} name="password" placeholder="Password" />
        {formik.touched.password && formik.errors.password ?
            <Alert variant="danger">{formik.errors.password}</Alert> : null}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicConfirm">
        <Form.Label>Подтверждение пароля</Form.Label>
        <Form.Control type="password" onChange={formik.handleChange} value={formik.values.confirm} name="confirm" placeholder="Password" />
        {formik.touched.confirm && formik.errors.confirm ?
            <Alert variant="danger">{formik.errors.confirm}</Alert> : null}
      </Form.Group>

      <Button variant="primary" type="button" onClick={formik.handleSubmit}>
        Зарегистрироваться
      </Button>
    </Form>
  )
}

export const RegistrationForm = () => BuildRegistrationForm();
