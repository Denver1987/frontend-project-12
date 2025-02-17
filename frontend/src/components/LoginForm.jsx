import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthData, resetNetworkError} from '../store/slices/auth.js';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';

const BuildLoginForm = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const isOnAuth = useSelector((state) => state.auth.isOnAuth);
  const isAuthFailed = useSelector((state) => state.auth.isAuthFailed);
  const isNetworkError = useSelector((state) => state.auth.isNetworkError);

  const showToast = (text) => toast.error(text);

  useEffect(() => {
    if (isNetworkError) {
      showToast(t('networkError'));
      dispatch(resetNetworkError());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNetworkError]);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    onSubmit: (({ username, password }, { setSubmitting }) => {
      dispatch(fetchAuthData({username, password}));
      setSubmitting(false);
    })
  });
  return (<>
    <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3 position-relative" controlId="formBasicUsername">
        <Form.Label>{t('yourNick')}</Form.Label>
        <Form.Control isInvalid={isAuthFailed} type="text" onChange={formik.handleChange} value={formik.values.username} name="username" placeholder="" required/>
      </Form.Group>

      <Form.Group className="mb-3 position-relative" controlId="formBasicPassword">
        <Form.Label>{t('password')}</Form.Label>
        <Form.Control isInvalid={isAuthFailed} type="password" onChange={formik.handleChange} value={formik.values.password} name="password" placeholder="Password" required/>
        <Form.Control.Feedback type="invalid" tooltip>
        {t('logWrong')}
        </Form.Control.Feedback>
      </Form.Group>
      <Button type="submit" disabled={isOnAuth}>{t('enter')}</Button>
    </Form>
    <ToastContainer />
    </>
  );
}

export const LoginForm = () => BuildLoginForm();
