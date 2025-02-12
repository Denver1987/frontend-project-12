import { io } from 'socket.io-client';
import { addNewMessage } from '../store/slices/messages.js';
import { addNewChannel } from '../store/slices/channels.js';
import { renameChannelInStore} from '../store/slices/channels.js'
import store from '../store';

export const socket = io();

socket.on('newMessage', (payload) => {
  console.log(payload);
  store.dispatch(addNewMessage(payload));
});

socket.on('newChannel', (payload) => {
    console.log(payload);
    store.dispatch(addNewChannel(payload));
  });

  socket.on('renameChannel', (payload) => {
    console.log(payload);
    store.dispatch(renameChannelInStore(payload));
  });
