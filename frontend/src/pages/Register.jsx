import { NavPanel } from "../components/navPanel.jsx";
import { Formik, Form, Field } from 'formik';
//import * as yup from 'yup';
import axios from 'axios';

const BuildPageRegister = () => {
    return (
        <>
          <NavPanel></NavPanel>

          <Formik
            initialValues={{
            username: "",
            password: "",
            repeatPassword: ""
          }}>
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
            <div className="form-group">
              <label htmlFor="password">Repeat Password</label>
              <Field
                type="password"
                name="password"
                className="form-control"
              />        
            </div>
            <button type="submit">Зарегистрироваться</button>
          </Form>
          )}
          </Formik>
        </>
      );
}

export const PageRegister = () => BuildPageRegister();