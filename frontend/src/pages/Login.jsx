import { useNavigate } from 'react-router-dom';
import { NavPanel } from '../components/navPanel.jsx';
import { Nav, Container } from 'react-bootstrap';
import { LoginForm } from '../components/LoginForm.jsx';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const BuildPageLogin = () => {
  const navigate = useNavigate();
  const authToken = useSelector((state) => state.auth.authToken);
  useEffect(() => {
    console.log('LoginPageUseEffectRun')
    if (authToken) {
      console.log('authTokenChange', authToken)
      navigate('/');
    }
  });

  return (
    <div className="d-flex flex-column h-100">
      <NavPanel></NavPanel>
      <Container className="h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-md-8">
            <LoginForm />
            <p>Нет аккаунта? <Nav.Link href="/register">Регистрация</Nav.Link></p>
          </div>
        </div>
      </Container>
    </div>
  );
}

export const PageLogin = () => BuildPageLogin();
