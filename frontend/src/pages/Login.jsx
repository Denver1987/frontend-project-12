import { useNavigate } from 'react-router-dom';
import { Nav, Container } from 'react-bootstrap';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import LoginForm from '../components/LoginForm.jsx';
import NavPanel from '../components/NavPanel.jsx';

const BuildPageLogin = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const authToken = useSelector((state) => state.auth.authToken);
  useEffect(() => {
    console.log('LoginPageUseEffectRun');
    if (authToken) {
      console.log('authTokenChange', authToken);
      navigate('/');
    }
  });

  return (
    <div className="d-flex flex-column h-100">
      <NavPanel />
      <Container className="h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-md-8">
            <LoginForm />
            <p>
              {t('noacc')}
              {' '}
              <Nav.Link href="/signup">{t('registration')}</Nav.Link>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default function PageLogin() {
  return BuildPageLogin();
}
