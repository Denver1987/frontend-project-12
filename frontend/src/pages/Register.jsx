import { Container } from 'react-bootstrap';
import NavPanel from '../components/NavPanel.jsx';
import RegistrationForm from '../components/RegistrationForm.jsx';

const BuildPageRegister = () => (
  <div className="d-flex flex-column h-100">
    <NavPanel />
    <Container fluid className="h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-md-8">
          <RegistrationForm />
        </div>
      </div>
    </Container>
  </div>
);

export default function PageRegister() {
  return BuildPageRegister();
}
