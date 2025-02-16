import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
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
      onSubmit: async (values) => {
        console.log(values);
        await axios.post('/api/v1/signup', { username: values.username, password: values.password }).then((response) => {
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
      <Form.Group className="mb-3 position-relative" controlId="formBasicEmail">
        <Form.Label>Имя пользователя</Form.Label>
        <Form.Control type="text" isInvalid={formik.touched.username && formik.errors.username} onChange={formik.handleChange} value={formik.values.username} name="username" placeholder="" />
        <Form.Control.Feedback type="invalid" tooltip>
          {formik.errors.username}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3 position-relative" controlId="formBasicPassword">
        <Form.Label>Пароль</Form.Label>
        <Form.Control type="password" isInvalid={formik.touched.password && formik.errors.password} onChange={formik.handleChange} value={formik.values.password} name="password" placeholder="Password" />
        <Form.Control.Feedback type="invalid" tooltip>
          {formik.errors.password}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3 position-relative" controlId="formBasicConfirm">
        <Form.Label>Подтверждение пароля</Form.Label>
        <Form.Control type="password"  isInvalid={formik.touched.confirm && formik.errors.confirm} onChange={formik.handleChange} value={formik.values.confirm} name="confirm" placeholder="Password" />
        <Form.Control.Feedback type="invalid" tooltip>
          {formik.errors.confirm}
        </Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="button" disabled={formik.isSubmitting} onClick={formik.handleSubmit}>
        Зарегистрироваться
      </Button>
    </Form>
  )
}

export const RegistrationForm = () => BuildRegistrationForm();
