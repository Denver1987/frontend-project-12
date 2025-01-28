import { Formik, Form, Field } from 'formik';
//import * as yup from 'yup';
import axios from 'axios';
import { authorize, getAuthToken } from '../utils/login.js';
import { Navigate, useNavigate } from 'react-router-dom';
//import { Nav, Button } from 'react-bootstrap';
import { NavPanel } from '../components/navPanel.jsx';
import { Nav } from 'react-bootstrap';

const BuildPageLogin = () => {
  const navigate = useNavigate();
  if (getAuthToken() !== 'null' || undefined) {
    return <Navigate to="/" />
  }
  return (
    <>
      <NavPanel></NavPanel>
      <Formik
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
          <div className="form-group">
            <label htmlFor="username">username</label>
            <Field
              type="text"
              name="username"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Field
              type="password"
              name="password"
              className="form-control"
            />        
          </div>
          <button type="submit">Войти</button>
        </Form>
      )}
      </Formik>
      <p>Нет аккаунта? <Nav.Link href="/register">Регистрация</Nav.Link></p>
    </>
  );
}
  
export const PageLogin = () => BuildPageLogin();