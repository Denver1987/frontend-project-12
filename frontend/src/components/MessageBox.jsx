import { useSelector } from "react-redux";

const BuildMessageBox = () => {
  const messages = useSelector((state) => state.messages.messages);
  return messages.map((message) =>
    (<div
      key={message.id}
      className="text-break mb-2">
        {message.username}: {message.body}
    </div>)
  )
}

export const MessageBox = () => BuildMessageBox();
