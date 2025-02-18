import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const BuildMessageBox = () => {
  const messages = useSelector((state) => state.messages.messages);
  const currentChannel = useSelector((state) => state.channels.currentChannelId);

  const messageBoxRef = useRef();

  useEffect(() => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTo({
        top: messageBoxRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  return (
    <div
      id="messages-box"
      ref={messageBoxRef}
      className="chat-messages overflow-auto px-5"
    >
      {
      messages.map((message) => {
        if (currentChannel === message.channelId) {
          return (
            <div
              key={message.id}
              className="text-break mb-2"
            >
              {message.username}
              :
              {message.body}
            </div>
          );
        } return null;
      })
    }
    </div>
  );
};

export default function MessageBox() {
  return BuildMessageBox();
}
