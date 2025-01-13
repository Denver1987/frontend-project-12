import { Nav, Button } from "react-bootstrap";
import { loguot, isAuthenticated } from "../utils/login";
import { useNavigate } from "react-router-dom";

const BuildNavPanel = () => {
  const navigate = useNavigate();
  return <Nav as="ul">
    <Nav.Item as="li">
      <Nav.Link href="/">Hexlet Chat</Nav.Link>
    </Nav.Item>
    {isAuthenticated() ? <Button variant="primary"  className="ms-auto" onClick={
      () => {
        loguot();
        navigate('/login');
      }
    }>Выйти</Button> : null}    
  </Nav>
}

export const NavPanel = () => BuildNavPanel();