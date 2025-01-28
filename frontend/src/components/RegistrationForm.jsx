import { Formik, Form, Field } from 'formik';

const buildRegistrationForm = () => {
  return <Formik
      initialValues={{
      username: "",
      password: "",
      repeatPassword: ""
    }}>
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
        <div className="form-group p-3">
          <label htmlFor="password">Repeat Password</label>
          <Field
            type="password"
            name="password"
            className="form-control"
          />
        </div>
        <div className="p-3">
          <button type="submit">Зарегистрироваться</button>
        </div>

      </Form>
    )}
    </Formik>
}

export const RegistrationForm = () => buildRegistrationForm();
