import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { authorize } from '../utils/login';
import routes from '../utils/routes.js';

const BuildRegistrationForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isRegFailed, setRegFailed] = useState(false);
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirm: '',
    },
    validationSchema: yup.object({
      username: yup.string()
        .min(3, t('3-20symb'))
        .max(20, t('3-20symb')),
      password: yup.string().min(6, t('min6symb')),
      confirm: yup.string().oneOf([yup.ref('password')], t('passnotconf')),
    }),
    onSubmit: async (values) => {
      await axios.post(routes.getSignupRoute(), {
        username: values.username,
        password: values.password,
      })
        .then((response) => {
          setRegFailed(false);
          authorize(response.data);
          navigate('/');
        }).catch(() => {
          setRegFailed(true);
        });
    },
  });
  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3 position-relative" controlId="formBasicEmail">
        <Form.Label>{t('username')}</Form.Label>
        <Form.Control type="text" isInvalid={(formik.touched.username && formik.errors.username) || isRegFailed} onChange={formik.handleChange} value={formik.values.username} name="username" placeholder="" required />
        <Form.Control.Feedback type="invalid" tooltip>
          {formik.errors.username}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3 position-relative" controlId="formBasicPassword" required>
        <Form.Label>{t('password')}</Form.Label>
        <Form.Control type="password" isInvalid={(formik.touched.password && formik.errors.password) || isRegFailed} onChange={formik.handleChange} value={formik.values.password} name="password" placeholder="Password" required />
        <Form.Control.Feedback type="invalid" tooltip>
          {formik.errors.password}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3 position-relative" controlId="formBasicConfirm">
        <Form.Label>{t('passconf')}</Form.Label>
        <Form.Control type="password" isInvalid={(formik.touched.confirm && formik.errors.confirm) || isRegFailed} onChange={formik.handleChange} value={formik.values.confirm} name="confirm" placeholder="Password" required />
        <Form.Control.Feedback type="invalid" tooltip>
          {isRegFailed ? t('userexist') : formik.errors.confirm}
        </Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit" disabled={formik.isSubmitting}>
        {t('register')}
      </Button>
    </Form>
  );
};

export default function RegistrationForm() {
  return BuildRegistrationForm();
}
