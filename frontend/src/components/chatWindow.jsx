import { Container, Form, InputGroup, Button } from "react-bootstrap"
import { useSelector } from "react-redux";
import { NewChannelButton } from "./buttons/NewChannelButton";
import { NewChannelModal } from "./modals/NewChannelModal";

const BuildChatWindow = () => {
  const channels = useSelector((state) => state.channels.channels);
  const messages = useSelector((state) => state.messages.messages);

  console.log(channels, messages);
  return <Container className="h-100 my-4 overflow-hidden rounded shadow">
    <div className="row h-100">
      <div className="col-3 h-100">
        <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
          <b>Каналы</b>
          <NewChannelButton />
        </div>
        <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
          {channels.map((channel)=> {
            return (<li key={channel.id}><Button variant="secondary" className="w-100 rounded-0 text-start"># {channel.name}</Button></li>)
          })}
        </ul>
      </div>
      <div className="col h-100">
        <div className="d-flex flex-column h-100">
          <div className="bg-light mb-4 p-3 shadow-sm small">
            <p className="m-0"><b># undefined</b></p>
            <span className="text-muted">0 сообщений</span>
          </div>
          <div id="messages-box" className="chat-messages overflow-auto px-5"></div>

          <div className="mt-auto">
            <Form>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Новое сообщение"
                />
                <Button variant="outline-secondary" id="button-addon2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                    <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"></path>
                  </svg>
                </Button>
              </InputGroup>
            </Form>
          </div>
        </div>

      </div>
    </div>
    <NewChannelModal></NewChannelModal>
  </Container>

}

export const ChatWindow = () => BuildChatWindow();
