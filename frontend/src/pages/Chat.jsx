//import * as yup from 'yup';
import { getAuthToken } from '../utils/login.js';
import { Navigate } from 'react-router-dom';
//import { Nav, Button } from 'react-bootstrap';
import { NavPanel } from '../components/navPanel.jsx';
import { ChatWindow } from '../components/chatWindow.jsx';

const BuildChatPage = () => {
  if (getAuthToken() === undefined) {
    return <Navigate to="/login" />
  } else {
    return (
      <div className="d-flex flex-column h-100">
        <NavPanel></NavPanel>
        <ChatWindow></ChatWindow>
      </div>
    );
  }
}

export const PageChat = () => BuildChatPage();
