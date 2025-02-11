import { Container } from "react-bootstrap"
import { NewChannelButton } from "./buttons/NewChannelButton";
import { NewChannelModal } from "./modals/NewChannelModal";
import { MessageInputForm } from "./MessageInputForm";
import { MessageBox } from "./MessageBox";
import { ChannelBox } from "./channelBox";

const BuildChatWindow = () => {
  return <Container className="h-100 my-4 overflow-hidden rounded shadow">
    <div className="row h-100">
      <div className="col-3 h-100">
        <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
          <b>Каналы</b>
          <NewChannelButton />
        </div>
        <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
          <ChannelBox />
        </ul>
      </div>
      <div className="col h-100">
        <div className="d-flex flex-column h-100">
          <div className="bg-light mb-4 p-3 shadow-sm small">
            <p className="m-0"><b># undefined</b></p>
            <span className="text-muted">0 сообщений</span>
          </div>
          <div id="messages-box" className="chat-messages overflow-auto px-5">
            <MessageBox />
          </div>
          <div className="mt-auto">
            <MessageInputForm />
          </div>
        </div>
      </div>
    </div>
    <NewChannelModal></NewChannelModal>
  </Container>

}

export const ChatWindow = () => BuildChatWindow();
