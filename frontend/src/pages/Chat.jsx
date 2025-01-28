import { Formik, Form, Field } from 'formik';
//import * as yup from 'yup';
import axios from 'axios';
import { authorize, getAuthToken } from '../utils/login.js';
import { Navigate, useNavigate } from 'react-router-dom';
//import { Nav, Button } from 'react-bootstrap';
import { NavPanel } from '../components/navPanel.jsx';
import { ChatWindow } from '../components/chatWindow.jsx';
import { Nav } from 'react-bootstrap';

const BuildChatPage = () => {
  if (getAuthToken() === 'null' || undefined) {
    return <Navigate to="/login" />
  } else {
    return (
      <>
        <NavPanel></NavPanel>
        <ChatWindow></ChatWindow>
      </>
    );
  }
}

export const PageChat = () => BuildChatPage();
