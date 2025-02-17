import { io } from 'socket.io-client';
import { addNewMessage } from '../store/slices/messages.js';
import { addNewChannel } from '../store/slices/channels.js';
import { renameChannelInStore, removeChannelFromStore} from '../store/slices/channels.js'
import store from '../store/index.js';
import { toast } from 'react-toastify';
import  { useTranslation } from 'react-i18next';


export const socket = io();

// const showToast = (text) => {toast.success(() => {
//   const { t } = useTranslation();
//   return (<div>{text}</div>)
// }) };



socket.on('newMessage', (payload) => {
  console.log(payload);
  store.dispatch(addNewMessage(payload));
});

socket.on('newChannel', (payload) => {
    console.log(payload);
    store.dispatch(addNewChannel(payload));
    toast.success('Канал создан');
  });

socket.on('renameChannel', (payload) => {
  console.log(payload);
  store.dispatch(renameChannelInStore(payload));
});

socket.on('removeChannel', (payload) => {
  console.log(payload);
  store.dispatch(removeChannelFromStore(payload));
});

