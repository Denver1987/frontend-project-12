import { Nav, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { removeAuthData } from '../store/slices/auth.js';
import { loguot, isAuthenticated } from '../utils/login.js';

const BuildNavPanel = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Nav as="nav" className="navbar navbar-expand-lg shadow-sm navbar-light bg-white">
      <Container>
        <Nav.Item as="div">
          <Nav.Link href="/">Hexlet Chat</Nav.Link>
        </Nav.Item>
        {isAuthenticated() ? (
          <Button
            variant="primary"
            className="ms-auto"
            onClick={
        () => {
          loguot();
          dispatch(removeAuthData());
          navigate('/login');
        }
      }
          >
            {t('exit')}
          </Button>
        ) : null}
      </Container>
    </Nav>
  );
};

export default function NavPanel() {
  return BuildNavPanel();
}
