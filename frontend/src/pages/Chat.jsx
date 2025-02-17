import { getAuthToken } from '../utils/login.js';
import { Navigate } from 'react-router-dom';
import { NavPanel } from '../components/NavPanel.jsx';
import { ChatWindow } from '../components/ChatWindow.jsx';
import { useDispatch } from 'react-redux';
import { fetchChannels } from '../store/slices/channels.js';
import { NewChannelModal } from '../components/modals/NewChannelModal.jsx';
import { fetchMessages } from '../store/slices/messages.js';
import { RenameChannelModal } from '../components/modals/RenameChannelModal.jsx';
import { RemoveChannelModal } from '../components/modals/RemoveChannelModal.jsx';
import { ToastContainer } from 'react-toastify';


const BuildChatPage = () => {
  const dispatch = useDispatch();
  if (getAuthToken() === undefined) {
    return <Navigate to="/login" />
  } else {
    dispatch(fetchChannels({authToken: getAuthToken()}));
    dispatch(fetchMessages({authToken: getAuthToken()}));
    return (
      <div className="d-flex flex-column h-100">
        <NavPanel></NavPanel>
        <ChatWindow></ChatWindow>
        <NewChannelModal />
        <RenameChannelModal />
        <RemoveChannelModal />
        <ToastContainer />
      </div>
    );
  }
}

export const PageChat = () => BuildChatPage();
