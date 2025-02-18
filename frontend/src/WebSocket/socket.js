import { io } from 'socket.io-client';
import { addNewMessage } from '../store/slices/messages.js';
import { renameChannelInStore, removeChannelFromStore, addNewChannel } from '../store/slices/channels.js';
import store from '../store';

const socket = io();

socket.on('newMessage', (payload) => {
  store.dispatch(addNewMessage(payload));
});

socket.on('newChannel', (payload) => {
  store.dispatch(addNewChannel(payload));
});

socket.on('renameChannel', (payload) => {
  store.dispatch(renameChannelInStore(payload));
});

socket.on('removeChannel', (payload) => {
  store.dispatch(removeChannelFromStore(payload));
});
