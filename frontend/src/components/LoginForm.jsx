import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { authorize, getAuthToken } from '../utils/login.js';
import { useNavigate } from 'react-router-dom';

const buildLoginForm = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
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
        }).then(() => {
          axios.get('/api/v1/channels', {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }).then((response) => {
          console.log(response.data);
        });
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

export const LoginForm = () => buildLoginForm();
