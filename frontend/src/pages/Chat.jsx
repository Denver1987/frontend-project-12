import { getAuthToken } from '../utils/login.js';
import { Navigate } from 'react-router-dom';
import { NavPanel } from '../components/navPanel.jsx';
import { ChatWindow } from '../components/chatWindow.jsx';
import { useDispatch } from 'react-redux';
import { fetchChannels } from '../store/slices/channels.js';

const BuildChatPage = () => {
  const dispatch = useDispatch();
  if (getAuthToken() === undefined) {
    return <Navigate to="/login" />
  } else {
    dispatch(fetchChannels({authToken: getAuthToken()}))
    return (
      <div className="d-flex flex-column h-100">
        <NavPanel></NavPanel>
        <ChatWindow></ChatWindow>
      </div>
    );
  }
}

export const PageChat = () => BuildChatPage();
