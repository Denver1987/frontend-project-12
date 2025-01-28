import { NavPanel } from "../components/navPanel.jsx";
import { Container } from "react-bootstrap";
import { RegistrationForm } from "../components/RegistrationForm.jsx";
//import * as yup from 'yup';


const BuildPageRegister = () => {
    return (
      <div className="d-flex flex-column h-100">
          <NavPanel></NavPanel>
          <Container fluid className="h-100">
            <div className="row justify-content-center align-content-center h-100">
              <div className="col-md-8">
                <RegistrationForm />
              </div>
            </div>
          </Container>
        </div>
      );
}

export const PageRegister = () => BuildPageRegister();
