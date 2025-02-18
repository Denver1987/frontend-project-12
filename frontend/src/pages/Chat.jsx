import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { getAuthToken } from '../utils/login.js';
import NavPanel from '../components/NavPanel.jsx';
import ChatWindow from '../components/ChatWindow.jsx';
import { fetchChannels } from '../store/slices/channels.js';
import NewChannelModal from '../components/modals/NewChannelModal.jsx';
import { fetchMessages } from '../store/slices/messages.js';
import RenameChannelModal from '../components/modals/RenameChannelModal.jsx';
import RemoveChannelModal from '../components/modals/RemoveChannelModal.jsx';

const BuildChatPage = () => {
  const dispatch = useDispatch();
  if (getAuthToken() === undefined) {
    return <Navigate to="/login" />;
  }
  dispatch(fetchChannels({ authToken: getAuthToken() }));
  dispatch(fetchMessages({ authToken: getAuthToken() }));
  return (
    <div className="d-flex flex-column h-100">
      <NavPanel />
      <ChatWindow />
      <NewChannelModal />
      <RenameChannelModal />
      <RemoveChannelModal />
      <ToastContainer />
    </div>
  );
};

// eslint-disable-next-line import/prefer-default-export
export const PageChat = () => BuildChatPage();
