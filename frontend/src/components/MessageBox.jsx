import { useSelector } from "react-redux";

const BuildMessageBox = () => {
  const messages = useSelector((state) => state.messages.messages);
  const currentChannel = useSelector((state) => state.channels.currentChannelId);

  return <div id="messages-box" className="chat-messages overflow-auto px-5">
    {
      messages.map((message) => {
        if (currentChannel === message.channelId) {
          return (<div
          key={message.id}
          className="text-break mb-2">
            {message.username}: {message.body}
          </div>)
        }
      })
    }
  </div>

}

export const MessageBox = () => BuildMessageBox();
