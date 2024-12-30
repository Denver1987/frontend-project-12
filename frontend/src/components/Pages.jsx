import { Formik, Form, Field } from 'formik'

const BuildPageLogin = () => (
    <>
      <Formik
  initialValues={{ email: "", password: "" }}
  onSubmit={({ setSubmitting }) => {
    console.log("Form is validated! Submitting the form...");
    setSubmitting(false);
  }}
>
  {() => (
    <Form>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <Field
          type="email"
          name="email"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <Field
          type="password"
          name="password"
          className="form-control" />        
      </div>
      <button>Войти</button>
    </Form>
  )}
</Formik>
    </>
  );

const buildNotExistPage = () => (
  <>
    <h1>Нет такой страницы</h1>
  </>
);
  
  export const PageLogin = () => BuildPageLogin();
  export const Page404 = () => buildNotExistPage();