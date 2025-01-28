import { Nav, Button, Container } from "react-bootstrap";
import { loguot, isAuthenticated } from "../utils/login";
import { useNavigate } from "react-router-dom";

const BuildNavPanel = () => {
  const navigate = useNavigate();
  return <Nav as="nav" className="navbar navbar-expand-lg shadow-sm navbar-light bg-white">
    <Container>
      <Nav.Item as="div">
        <Nav.Link href="/">Hexlet Chat</Nav.Link>
      </Nav.Item>
      {isAuthenticated() ? <Button variant="primary"  className="ms-auto" onClick={
        () => {
          loguot();
          navigate('/login');
        }
      }>Выйти</Button> : null}
    </Container>
  </Nav>
}

export const NavPanel = () => BuildNavPanel();
