import { Formik, Form, Field } from 'formik';
//import * as yup from 'yup';
import axios from 'axios';
import { authorize, getAuthToken, loguot } from '../utils/login.js';
import { Navigate, useNavigate } from 'react-router-dom';
import { Nav, Button } from 'react-bootstrap';

const BuildPageLogin = () => {
  const navigate = useNavigate();
  if (getAuthToken() !== 'null' || undefined) {
    return <Navigate to="/" />
  }
  return (
    <>
      <Nav defaultActiveKey="/home" as="ul">
      <Nav.Item as="li">
        <Nav.Link href="/home">Active</Nav.Link>
      </Nav.Item>
    </Nav>
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
            <label htmlFor="email">username</label>
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
    </>
  );
}

const BuildNotExistPage = () => (
  <>
    <h1>Нет такой страницы</h1>
  </>
);

const BuildChatPage = () => {
  const navigate = useNavigate();
  if (getAuthToken() === 'null' || undefined) {
    return <Navigate to="/login" />
  } else {
    return (
      <>
        <Nav defaultActiveKey="/home" as="ul">
          <Nav.Item as="li">
            <Nav.Link href="/home">Active</Nav.Link>
          </Nav.Item>
          <Button variant="primary" onClick={
            () => {
              loguot();
              navigate('/login');
            }
          }>Выйти</Button>
        </Nav>
        <h1>Добро пожаловать в Чат</h1>
      </>
  );
  }
  
}


  
  export const PageLogin = () => BuildPageLogin();
  export const Page404 = () => BuildNotExistPage();
  export const PageChat = () => BuildChatPage();